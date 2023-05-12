# Webpack Enhanced Resolve Issue Reproduction

This package was created to reproduce a GitHub issue that I am having with webpack.

**Issue**: https://github.com/webpack/enhanced-resolve/issues/382.

## How to Start

1. Run `npm i`
2. Run `npm start`

## The Issue

I am trying to resolve npm packages (that are not stored in a standard `node_modules` folder) entry point by webpack target, but without success. As you can see, all the relevant packages are installed in the `external_modules` directory, and each package is installed in a special path.

Available packages:

- `aModuleWithMultipleEntryPoints` -> `external_modules/current_version_start/aModuleWithMultipleEntryPoints/current_version_end/aModuleWithMultipleEntryPoints`
- `anotherModuleWithMultipleEntryPoints` -> `external_modules/current_version_start/anotherModuleWithMultipleEntryPoints/current_version_end/aModuleWithMultipleEntryPoints`
- `@company/monorepo` -> `external_modules/current_version_start/@company/monorepo/current_version_end/@company/monorepo`

`aModuleWithMultipleEntryPoints` is importing `anotherModuleWithMultipleEntryPoints`.

I have made the following imports work:

```
// works
require('aModuleWithMultipleEntryPoints')

// works
require('@company/aMonorepo');
```

But I can't make this one work:

```
// doesn't work
require('@company/aMonorepo/subPackage');
```


There are monorepos like `@mui/material` that have subPackages without a name property inside their `package.json`. I have tried to mimic it here, and my resolver isn't able to resolve its entry point.
