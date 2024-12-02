import { exists } from "@std/fs";
import { build } from "esbuild";

const outDirectory = "unpacked";

if (import.meta.main) {
  if (await exists(outDirectory)) {
    await Deno.remove(outDirectory, { recursive: true });
  }

  await build({
    entryPoints: ["src/service-worker.ts"],
    outfile: `${outDirectory}/service-worker.js`,
  });

  await Deno.copyFile("src/manifest.json", `${outDirectory}/manifest.json`);
}
