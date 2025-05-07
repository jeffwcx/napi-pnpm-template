import fs from 'node:fs';

const packageJsonPath = './package.json';
const originalPackageJson = fs.readFileSync(packageJsonPath, 'utf-8');
const packageJson = JSON.parse(originalPackageJson);

if (!packageJson.pnpm) {
  packageJson.pnpm = {};
}
if (!packageJson.pnpm.overrides) {
  packageJson.pnpm.overrides = {};
}
packageJson.pnpm.overrides.rollup = 'npm:@rollup/wasm-node';
packageJson.pnpm.overrides.esbuild = 'npm:esbuild-wasm';

fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
