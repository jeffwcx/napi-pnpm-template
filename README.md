# napi-npm-template

[![CI](https://github.com/jeffwcx/napi-pnpm-template/actions/workflows/CI.yml/badge.svg)](https://github.com/jeffwcx/napi-pnpm-template/actions/workflows/CI.yml)

> Template project for writing node packages with napi-rs.

# Usage

1. Click **Use this template**.
2. **Clone** your project.
3. Run `pnpm install` to install dependencies.
4. Run `npx napi rename -n [name]` command under the project folder to rename your package.

## Install this test package

```
pnpm add @jeffwcx/pnpm
```

## Support matrix

### Operating Systems

|                  | node14 | node16 | node18 |
| ---------------- | ------ | ------ | ------ |
| Windows x64      | ✓      | ✓      | ✓      |
| Windows x32      | ✓      | ✓      | ✓      |
| Windows arm64    | ✓      | ✓      | ✓      |
| macOS x64        | ✓      | ✓      | ✓      |
| macOS arm64      | ✓      | ✓      | ✓      |
| Linux x64 gnu    | ✓      | ✓      | ✓      |
| Linux x64 musl   | ✓      | ✓      | ✓      |
| Linux arm gnu    | ✓      | ✓      | ✓      |
| Linux arm64 gnu  | ✓      | ✓      | ✓      |
| Linux arm64 musl | ✓      | ✓      | ✓      |
| Android arm64    | ✓      | ✓      | ✓      |
| Android armv7    | ✓      | ✓      | ✓      |
| FreeBSD x64      | ✓      | ✓      | ✓      |

## Ability

### Build

After `pnpm build/npm run build` command, you can see `pnpm.[darwin|win32|linux].node` file in project root. This is the native addon built from [lib.rs](./src/lib.rs).

### Test

With [vitest](https://github.com/vitest-dev/vitest), run `pnpm test/npm run test` to testing native addon. You can also switch to another testing framework if you want.

### CI

With GitHub Actions, each commit and pull request will be built and tested automatically in [`node@14`, `node@16`, `@node18`] x [`macOS`, `Linux`, `Windows`] matrix. You will never be afraid of the native addon broken in these platforms.

### Release

Release native package is very difficult in old days. Native packages may ask developers who use it to install `build toolchain` like `gcc/llvm`, `node-gyp` or something more.

With `GitHub actions`, we can easily prebuild a `binary` for major platforms. And with `N-API`, we should never be afraid of **ABI Compatible**.

The other problem is how to deliver prebuild `binary` to users. Downloading it in `postinstall` script is a common way that most packages do it right now. The problem with this solution is it introduced many other packages to download binary that has not been used by `runtime codes`. The other problem is some users may not easily download the binary from `GitHub/CDN` if they are behind a private network (But in most cases, they have a private NPM mirror).

In this package, we choose a better way to solve this problem. We release different `npm packages` for different platforms. And add it to `optionalDependencies` before releasing the `Major` package to npm.

`NPM` will choose which native package should download from `registry` automatically. You can see [npm](./npm) dir for details. And you can also run `pnpm add @jeffwcx/pnpm` to see how it works.

## Develop requirements

- Install the latest `Rust`
- Install `Node.js@10+` which fully supported `Node-API`
- Install `pnpm@9`

## Test in local

- pnpm i
- pnpm build
- pnpm test

And you will see:

```bash
> vitest

 ✓ tests/index.spec.ts (1 test) 1ms
   ✓ sync function from native code 1ms

 Test Files  1 passed (1)
      Tests  1 passed (1)
   Start at  23:13:54
   Duration  190ms (transform 20ms, setup 0ms, collect 20ms, tests 1ms, environment 0ms, prepare 32ms)
```

## Release package

Ensure you have set your **NPM_TOKEN** in the `GitHub` project setting.

In `Settings -> Secrets`, add **NPM_TOKEN** into it.

When you want to release the package:

```
npm version [<newversion> | major | minor | patch | premajor | preminor | prepatch | prerelease [--preid=<prerelease-id>] | from-git]

git push
```

GitHub actions will do the rest job for you.
