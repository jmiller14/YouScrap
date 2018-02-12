# React Native TypeScript Boilerplate
This is a boilerplate project for working with React Native and TypeScript.

You can copy or reference this repository in order to get started with a React Native
project using a TypeScript source that includes environment variable
configuration, linting, and testing with sensible defaults.

## Installation
Requirements:
* `yarn` 1.3.2
* `node` 9

> You can also install the `react-native-cli`, but it's not necessary and you
can use `yarn react-native` relative to this project instead. This documentation
will refer to all commands run using the command name. If you don't have the
command globally installed, using `yarn <command>` or `npx command` should
do the same thing in most cases.  
> For Example if you don't have `react-native` on your path and the docs tell
you to do `react-native start` you can replace it with `yarn react-native
start`. In some cases, `yarn` _is_ the base command.

You can create a base project by cloning this or by using `react-native init`
and copying over the relevant content / files that you need. Copying the
boilerplate is recommended at this time.

Once you have your base project, run `yarn install`.

Update `app.json` as needed to reflect your app name and other meta information.

You will also have to update `index.js` to register the correct app name.

Now remove the `ios` and `android` directories. Run `react-native eject` to
recreate them with your settings.

Note the changes to `ios/$PROJECT/AppDelegate.m`:

```diff
+#ifdef DEBUG
   jsCodeLocation = [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index" fallbackResource:nil];
+#else
+  jsCodeLocation = [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];
+#endif
```

This will use the release bundle for iOS apps built with the `Release`
configuration automatically.

## Development
The easiest way to develop locally is to start the local development server and
run the app in an iOS and/or Android emulator.

```
react-native start
react-native run-ios
react-native run-android
```

If you have a simulator open for a platform, React Native will use it
automatically with the `run-<platform>` command. Otherwise you can specify a
device or simulator with the options for `react-native run-<platform>`.

You can reload the app with <kbd>Cmd-r</kbd> on iOS or <kbd>r r</kbd> on
Android. You can also open the menu with <kbd>Cmd-d</kbd> on iOS or
<kbd>Cmd-m</kbd> in Android. This will give you options to enable live reloading
and hot reloading.

Remember that the React Native server must be running for `run-<platform>` to
work. This is done with `react-native start`. You may want to use
`react-native start --reset-cache` in some cases.

### Unit Testing
Write unit tests relative to the files they are testing in corresponding
`__tests__` directories (per jest standards). A working sample is given in
`src/__tests__/App.test.tsx`. You should be able to create any `__tests__/*.test.tsx`
files and they will be picked up by jest.

`yarn test` will run the unit tests. You can also use `yarn test --coverage`
to generate a coverage report in the `coverage/` directory.

### Formatting
Formatting is handled by [`prettier`](https://github.com/prettier/prettier).
`prettier` will run automatically on `git commit` to format all files.

You should add a prettier plugin for your editor so you can see the changes
ahead of time. This is not strictly necessary, but will help normalize the
output files and your changes as you develop.

### Linting
`yarn lint` will run the linter. Linting is also run at commit time, and any
automatic fixes are applied. If there are linter errors, the commit will fail.

You should add a TypeScript and tslint plugin to your editor so you can catch
any errors in real time.

### Path Aliases
In order to make importing more convenient, absolute imports can be done from
the `src` directory. For example:

```ts
// App.tsx
import { API_URL } from 'src/Config.ts';
```

This will work instead of having to do `../src/Config.ts` or `./Config.ts` or
finding a relative path for a given module/file.

This works by having `tsconfig.json#compilerOptions.baseUrl: "."` and also
having `src/package.json#name: "src"`.

You can create more path aliases in a similar fashion by adding a
`package.json` to a given path with a name that corresponds to the path alias.

#### For Tests
This is handled via `package.json@jest.moduleNameMapper: "src(.*)": "<rootDir>/src/$1"`.
This maps any imports from `src/` to the root of the project.

## Environment Variables
*Do not set secret configuration in version control or the environment*.

Configuration of the app is handled through environment variables. When running
the development server, or bundling, the environment variables must be set.

```
API_URL=test react-native start
```

In order to add a new environment variable, update `src/Config.ts`:

```ts
+ export const NAME = get(process.env['NAME'], 'default value');
```

Now you can `import { NAME } from 'src/Config.ts` wherever it's needed.

Remember to set the environment variables you need  before running `react-native
start`, `xcodebuild`, or `android/gradlew assembe$DEBUG_OR_RELEASE`.

## Building
Developing using the local server is highly recommended. If you need to test on
real devices or create a build you will not necessarily be able to use live
reloading or hot reloading to assist you.

These builds steps will also work to create builds for qa and release.

### iOS
iOS automatically creates a release bundle used by the app when it's built for
release so you don't have to bundle manually.

First, set whatever environment variables you need to do the build.

```sh
xcodebuild -project ios/$PROJECT.xcodeproj -scheme $SCHEME \
  -configuration $DEBUG_OR_RELEASE \
  -archivePath ios/output/$PROJECT.xcarchive \
  clean archive
```

This will generate the build artifact xcarchive in `ios/output/$PROJECT.xcarchive`.

You can now create a .ipa using `xcodebuild` or Xcode with this build scheme.

### Android
Android works a bit differently depending upon whether you're building for
debug or release.

#### Debug
Android does not automatically create a JavaScript bundle for debug, so you
must have your development server running to serve the bundle (`react-native
start `).

```sh
cd android
./gradlew assembleDebug
```

This will create `android-debug.apk` in `android/app/build/outputs/apk` which
you can install on an app or emulator.

If you have an emulator running, you can also do `./gradlew installDebug` to
install it to the emulator immediately.

#### Release
First, set whatever environment variables you need for the build.

In the `andrdoid/` directory, `./gradlew assembleRelease` will automatically
build the JavaScript bundle and create the unsigned apk for you in
`android/app/build/outputs/apk`.

**Note:** The `bundleJsAndAssets` build step will only run if the source or
assets have changed. If you only want to change configuration but create a new
build, run `./gradlew clean` first.

If the build does not work for some reason, try `rm -rf node_modules` and
`yarn install` and retry.

## Philosophy
> *Why `yarn` over `npm`?

The tools are very similar and can probably used interchangeably in a lot of
cases -- at least for local development. `yarn` offers some advantages over
`npm`.

1. `yarn` is faster (although less-so with the latest `npm`).
2. `yarn.lock` offers more consistency than `package-lock.json`
   * It also avoids an annoying <kbd>tab</kbd> completion conflict with `package.json`
3. Most React / Facebook tools, libraries, and documentation prefer yarn or
 use it exclusively.
4. `yarn` has a simpler / more straightforward mechanism for adding and managing
 dependencies and for running scripts.

> *Why aren't there more `package.json#scripts` such as `yarn start`?

Understanding how to use a tool properly for development is important. The lack
of setup scripts encourages developers to look up the documentation of the tool
they want to use so they can set the options they need for the specific task
they're trying to do.

In a lot of cases, scripts don't offer much additional help. So if we had
`"start": "react-native start"` all that would do is allow us to run `yarn start`
instead of `yarn react-native start` and the latter is more meaningful.

Sometimes it is useful to have scripts when we want to force particular
behavior. Examples are `yarn test` and `yarn lint` where we want to enforce
proper type checking and linting of all required files in addition to some base
behavior. These scripts are also more complex.
