#!/bin/sh
pnpm esbuild ./tests/index.cjs --bundle | node - >./results/esbuild.txt
pnpm webpack --entry ./tests/index.cjs -o webpacked --mode=development && node webpacked/main.js >./results/webpack.txt; rm -rf webpacked
pnpm rspack --entry ./tests/index.cjs -o rspacked --mode=development && node rspacked/main.js >./results/rspack.txt; rm -rf rspacked
pnpm rollup ./tests/index.cjs --format cjs --inlineDynamicImports --plugin @rollup/plugin-commonjs --external object-inspect | node - >./results/rollup.txt
pnpm rolldown ./tests/index.cjs --format cjs --inlineDynamicImports | node - >./results/rolldown.txt
pnpm vite build --ssr ./tests/index.cjs --outDir vite && node vite/index.mjs >./results/vite.txt; rm -rf vite
bun build ./tests/index.cjs | node --input-type=module - >./results/bun-build.txt
node ./tests/index.cjs >./results/node.txt
bun ./tests/index.cjs >./results/bun.txt
deno --allow-read ./tests/index.cjs >./results/deno.txt
