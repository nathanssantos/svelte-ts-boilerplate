# Svelte TypeScript Boilerplate

Boilerplate for [Svelte](https://svelte.dev) applications, built with [Svelte Material UI](https://sveltematerialui.com) as a component library and [Vite](https://vitejs.dev) as a build tool.

## Setup

1 - Install the project dependencies:

```
yarn
```

2 - Prepare the theme library style:

```
yarn prepare
```

3 - Install all the necessary extensions for VS Code:

- Svelte for VS Code
- Eslint
- Prettier
- EditorConfig

## Running the project

```
yarn dev
```

_The command `yarn prepare` must be executed every time the `theme/_smui-theme.scss` file is modified._

## Build

```
yarn build
```

To visualize the preview:

```
yarn preview
```

## Dependencies

### `axios`

[Github](https://github.com/axios/axios) | [NPM](https://www.npmjs.com/package/axios)

Promise based HTTP client for the browser and node.js.

### `yup`

[Github](https://github.com/jquense/yup) | [NPM](https://www.npmjs.com/package/yup)

Yup is a schema builder for runtime value parsing and validation. Define a schema, transform a value to match, assert the shape of an existing value, or both. Yup schema are extremely expressive and allow modeling complex, interdependent validations, or value transformation.

## Dev Dependencies

### `eslint`

[Github](https://github.com/eslint/eslint) | [NPM](https://www.npmjs.com/package/eslint)

ESLint is a tool for identifying and reporting on patterns found in ECMAScript/JavaScript code.

### `prettier`

[Github](https://github.com/prettier/prettier) | [NPM](https://www.npmjs.com/package/prettier)

Prettier is an opinionated code formatter. It enforces a consistent style by parsing your code and re-printing it with its own rules that take the maximum line length into account, wrapping code when necessary.
