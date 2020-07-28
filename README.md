# Lazysizes progressive extension

Customized version of the original
[lazysizes-progressive](https://github.com/aFarkas/lazysizes/blob/gh-pages/plugins/progressive/ls.progressive.js)
plugin.

Modifications:

- Use `srcset` instead of `src` as attribute
- Support `object-fit` and `object-position`
- Opt into behavior by applying a `lazyloadprogressive` class

## Installation

```bash
npm install @daun/lazysizes-progressive
```

## Usage

```bash
import lazySizes from 'lazysizes'
import '@daun/lazysizes-progressive'

Object.assign(lazySizes.cfg, {})
```

## License

[MIT License](https://opensource.org/licenses/MIT) © [Philipp Daun](https://philippdaun.net/)
