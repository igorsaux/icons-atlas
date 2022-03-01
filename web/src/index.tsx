import 'normalize.css'
import 'tippy.js/dist/tippy.css'
import 'tippy.js/dist/border.css'
import './styles/Tooltip.scss'
import { render } from 'preact'
import App from './components/App'
import init, { setup_hook } from './pkg'

async function initialize() {
  console.group('Initialization')
  console.debug('Initializing wasm...')
  await init()
  console.debug('Initialized.')

  console.debug('Setup hooks.')
  setup_hook()
  console.groupEnd()
}

async function main() {
  await initialize()

  render(<App />, document.body)
}

main()
