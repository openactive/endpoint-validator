import fetch from 'isomorphic-fetch'
import {push} from 'react-router-redux'

const SET_IS_AWAITING_VALIDATION = 'openactive-endpoint-validator/validator/SET_IS_AWAITING_VALIDATION'
const INIT_ENDPOINT_VALIDATION = 'openactive-endpoint-validator/validator/INIT_ENDPOINT_VALIDATION'
const SUCCEED_ENDPOINT_VALIDATION = 'openactive-endpoint-validator/validator/SUCCEED_ENDPOINT_VALIDATION'
const FAIL_ENDPOINT_VALIDATION = 'openactive-endpoint-validator/validator/FAIL_ENDPOINT_VALIDATION'

export const VALIDATION_STATES = {
  IN_PROGRESS: 'openactive-endpoint-validator/validator/VALIDATION_STATES/IN_PROGRESS',
  SUCCEEDED: 'openactive-endpoint-validator/validator/VALIDATION_STATES/SUCCEEDED',
  FAILED: 'openactive-endpoint-validator/validator/VALIDATION_STATES/FAILED'
}

const INITIAL_STATE = {
  isAwaitingValidation: true,
  endpointUrl: null,
  state: null,
  errorReason: null
}

export default function validator(state={...INITIAL_STATE}, action) {
  switch (action.type) {
    case INIT_ENDPOINT_VALIDATION:
      const {endpointUrl} = action
      return {...state, state: VALIDATION_STATES.IN_PROGRESS, endpointUrl, errorReason: null, isAwaitingValidation: false}
    case SUCCEED_ENDPOINT_VALIDATION:
      return {...state, state: VALIDATION_STATES.SUCCEEDED, errorReason: null}
    case FAIL_ENDPOINT_VALIDATION:
      const {errorReason} = action
      return {...state, state: VALIDATION_STATES.FAILED, errorReason}
    case SET_IS_AWAITING_VALIDATION:
      const {isAwaitingValidation} = action
      return {...state, isAwaitingValidation}
    default:
      return state
  }
}

const initEndpointValidation = endpointUrl => ({type: INIT_ENDPOINT_VALIDATION, endpointUrl})
const succeedEndpointValidation = () => ({type: SUCCEED_ENDPOINT_VALIDATION})
const failEndpointValidation = errorReason => ({type: FAIL_ENDPOINT_VALIDATION, errorReason})
const setIsAwaitingValidation = isAwaitingValidation => ({type: SET_IS_AWAITING_VALIDATION, isAwaitingValidation})

export const doEndpointValidation = endpointUrl => (
  (dispatch, getState) => {
    dispatch(initEndpointValidation(endpointUrl))

    const succeed = () => { dispatch(succeedEndpointValidation()) }
    const fail = error => { dispatch(failEndpointValidation(error.message)) }

    fetch(endpointUrl)
      .then(response => {
        if (response.status >= 400) {
          throw new Error(`Received ${response.status} error from endpoint`)
        }
        return response.json().catch(() => {
          throw new Error('Invalid JSON')
        })
      })
      .then(json => {
        // TODO Validation of JSON
      })
      .then(succeed, fail)
  }
)

export const doAwaitValidation = endpointUrl => (
  (dispatch, getState) => {
    const escapedUrl = endpointUrl ? encodeURIComponent(endpointUrl) : ''
    dispatch(push(`/validate?url=${escapedUrl}`))
    dispatch(setIsAwaitingValidation(true))
  }
)
