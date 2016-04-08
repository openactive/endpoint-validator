import {combineReducers} from 'redux'
import {routerReducer} from 'react-router-redux'
import {reducer as formReducer} from 'redux-form'
import validatorReducer from '../reducers/validator'

export default combineReducers({
  routing: routerReducer,
  form: formReducer,
  validator: validatorReducer
})
