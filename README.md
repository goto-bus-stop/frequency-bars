# frequency-bars

nanocomponent rendering realtime audio frequencies as a bar chart

[Install](#install) - [Usage](#usage) - [License: Apache-2.0](#license)

[![npm][npm-image]][npm-url]
[![travis][travis-image]][travis-url]
[![standard][standard-image]][standard-url]

[npm-image]: https://img.shields.io/npm/v/frequency-bars.svg?style=flat-square
[npm-url]: https://www.npmjs.com/package/frequency-bars
[travis-image]: https://img.shields.io/travis/goto-bus-stop/frequency-bars.svg?style=flat-square
[travis-url]: https://travis-ci.org/goto-bus-stop/frequency-bars
[standard-image]: https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat-square
[standard-url]: http://npm.im/standard

## Install

```
npm install frequency-bars
```

## Usage

```js
var FrequencyBars = require('frequency-bars')
var html = require('nanohtml')

var bars = new FrequencyBars()
var audio = new Audio('./path/to/audio.mp3')

document.body.appendChild(html`
  <div>
    ${bars.render({
      width: 400,
      height: 240,
      background: '#222',
      audio
    })}
  </div>
`)

audio.play()
```

## License

[Apache-2.0](LICENSE.md)
