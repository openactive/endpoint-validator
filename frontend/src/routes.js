/*eslint-disable*/
import React from 'react'
import {IndexRoute, Route} from 'react-router'
import NotFound from './containers/NotFound'
import App from './containers/App'
import LandingPage from './containers/LandingPage'
import ValidatePage from './containers/ValidatePage'
/*eslint-enable*/

export default (
  <Route path="/" component={App}>
    <IndexRoute component={LandingPage} />
    <Route path="validate" component={ValidatePage} />
    {/* Catch all route */}
    <Route path="*" component={NotFound} status={404} />
  </Route>
)
