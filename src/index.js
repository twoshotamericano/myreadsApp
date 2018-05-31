import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import './index.css'
import {BrowserRouter} from 'react-router-dom'

ReactDOM.render(
  <BrowserRouter>
    <h1>Here is some text </h1>
    <App />
  </BrowserRouter>,
  document.getElementById('root'))
