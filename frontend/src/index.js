/*eslint-disable*/
import React from 'react'
import ReactDOM from 'react-dom'
import Root from './containers/Root'
import { hashHistory } from 'react-router'
/*eslint-enable*/

ReactDOM.render(
  <Root history={hashHistory} />,
  document.getElementById('root')
)
