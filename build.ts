import { exists } from "@std/fs";
import { build } from "esbuild";
import { denoPlugins } from "@luca/esbuild-deno-loader";

const outDirectory = "unpacked";

if (import.meta.main) {
  if (await exists(outDirectory)) {
    await Deno.remove(outDirectory, { recursive: true });
  }

  await build({
    plugins: [...denoPlugins()],
    entryPoints: ["src/service-worker.ts"],
    outfile: `${outDirectory}/service-worker.js`,
    bundle: true,
  });

  await build({
    plugins: [...denoPlugins()],
    entryPoints: ["src/content-script.ts"],
    outfile: `${outDirectory}/content-script.js`,
    bundle: true,
  });

  const manifest = JSON.parse(await Deno.readTextFile("src/manifest.json"));
  manifest["trial_tokens"] = [
    Deno.env.get("TRIAL_TOKEN_PROMPT_API_FOR_CHROME_EXTENSIONS")!,
  ];
  await Deno.writeTextFile(
    `${outDirectory}/manifest.json`,
    JSON.stringify(manifest),
  );
}
