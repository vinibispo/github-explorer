import {StrictMode} from 'react'
import {render} from 'react-dom'
function App() {
  return (
    <h1>Hello World</h1>
  )
}

render(<StrictMode><App/></StrictMode>, document.querySelector('#root'))
