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

  await Deno.copyFile("src/manifest.json", `${outDirectory}/manifest.json`);
}
