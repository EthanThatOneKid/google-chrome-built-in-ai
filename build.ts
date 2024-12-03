import { exists, expandGlob } from "@std/fs";
import { build } from "esbuild";
import { pluginReplace } from "@espcom/esbuild-plugin-replace";
import { denoPlugins } from "@luca/esbuild-deno-loader";

const outDirectory = "unpacked";

if (import.meta.main) {
  if (await exists(outDirectory)) {
    await Deno.remove(outDirectory, { recursive: true });
  }

  await build({
    plugins: [
      pluginReplace([{
        filter: /.*/,
        replace: '"GEMINI_API_KEY"',
        replacer: () => `"${Deno.env.get("GEMINI_API_KEY")!}"`,
      }]),
      ...denoPlugins(),
    ],
    entryPoints: ["src/service-worker.ts"],
    outfile: `${outDirectory}/service-worker.js`,
    bundle: true,
    format: "esm",
  });

  await build({
    plugins: [...denoPlugins()],
    entryPoints: ["src/content-script.ts"],
    outfile: `${outDirectory}/content-script.js`,
    bundle: true,
  });

  for await (const file of expandGlob("src/*.png")) {
    await Deno.copyFile(file.path, `${outDirectory}/${file.name}`);
  }

  const manifest = JSON.parse(await Deno.readTextFile("src/manifest.json"));
  manifest["trial_tokens"] = [
    Deno.env.get("TRIAL_TOKEN_PROMPT_API_FOR_CHROME_EXTENSIONS")!,
  ];
  await Deno.writeTextFile(
    `${outDirectory}/manifest.json`,
    JSON.stringify(manifest),
  );
}
