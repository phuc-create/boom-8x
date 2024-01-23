import React from 'react'
import {createRoot} from 'react-dom/client'
import App from './App'
import reportWebVitals from './reportWebVitals'
import { BrowserRouter as Router } from 'react-router-dom'
import './index.scss'
import { Provider } from 'react-redux'
import store from './redux/store'

const container = document.getElementById('root')
const root = createRoot(container as HTMLElement)
root.render(
  <Provider store={store}>
    <React.StrictMode>
      <Router>
        <App />
      </Router>
    </React.StrictMode>
  </Provider>,
)

reportWebVitals()
