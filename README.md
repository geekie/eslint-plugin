# ESLint utilities used at Geekie

## Installation

Install using:

```
$ yarn add --dev eslint eslint-plugin-geekie
```

## Usage

Add `geekie` to your `.eslintrc.json` plugins:

<!-- prettier-ignore -->
```json
{
  "plugins": [
    "geekie"
  ]
}
```

And add one of the configs to `extends`:

<!-- prettier-ignore -->
```json
{
  "extends": [
    "plugin:@geekie/recommended"
  ]
}
```

Or add each rule individually:

<!-- prettier-ignore -->
```json
{
  "rules": {
    "@geekie/no-general-eslint-disable": "error"
  }
}
```

## Configs

The plugin exports two config:

- `rules`: enables the rules included in the plugin
- `recommended`: a sensible config for JS only, and enables the rules included in the plugin

## Rules

The plugin exports two rules:

- `no-general-eslint-disable`: disables usage of `eslint-disable` without specific rules, to prevent turning off linting completely in a line or in a file.
- `no-stringify-in-matcher`: prevents usage of `JSON.stringify` in Jest matchers (it might work with others) because the serialization order is not reliable.
