const choo = require('choo')
const html = require('choo/html')
const FrequencyBars = require('..')

const DEFAULT_AUDIO = 'https://api.soundcloud.com/tracks/495867858/stream?client_id=9d883cdd4c3c54c6dddda2a5b3a11200'

const app = choo()

app.use((state, emitter) => {
  state.playing = false
  state.audio = new Audio(DEFAULT_AUDIO)
  state.audio.crossOrigin = 'anonymous'

  emitter.on('play', () => {
    state.audio.play()
    state.playing = true
  })
  emitter.on('file', (file) => {
    if (state.audio && /^blob:/.test(state.audio.src)) {
      URL.revokeObjectURL(state.audio.src)
    }

    state.audio = new Audio(URL.createObjectURL(file))
    state.audio.addEventListener('canplaythrough', () => {
      emitter.emit('render')
      state.audio.play()
    })
  })
})

app.route('/', (state, emit) => {
  return html`
    <body>
      ${!state.playing && html`
        <p>
          Browsers tend to block autoplay. Select a file below or click <button onclick=${onplay}>here</button> to start playing a demo track.
        </p>
      `}
      <p>
        <input type="file" onchange=${onchange} accept="audio/*">
      </p>
      <p>
        (Example is <a href="https://soundcloud.com/98b/4-stop-talking-featjvcki-wai">BRYN – stop talking! (feat. Jvcki Wai)</a>)
      </p>
      ${state.cache(FrequencyBars, 'bars').render({
        width: 600,
        height: 400,
        audio: state.audio
      })}
    </body>
  `

  function onchange (ev) {
    var file = ev.target.files[0]
    emit('file', file)
  }

  function onplay () {
    emit('play')
  }
})

app.mount('body')
