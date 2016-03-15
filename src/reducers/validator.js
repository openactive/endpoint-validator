const INIT_ENDPOINT_VALIDATION = 'openactive-endpoint-validator/validator/INIT_ENDPOINT_VALIDATION'
const SUCCEED_ENDPOINT_VALIDATION = 'openactive-endpoint-validator/validator/SUCCEED_ENDPOINT_VALIDATION'
const FAIL_ENDPOINT_VALIDATION = 'openactive-endpoint-validator/validator/FAIL_ENDPOINT_VALIDATION'

export const VALIDATION_STATES = {
  IN_PROGRESS: 'openactive-endpoint-validator/validator/VALIDATION_STATES/IN_PROGRESS',
  SUCCEEDED: 'openactive-endpoint-validator/validator/VALIDATION_STATES/SUCCEEDED',
  FAILED: 'openactive-endpoint-validator/validator/VALIDATION_STATES/FAILED'
}

const INITIAL_STATE = {
  endpointUrl: null,
  state: null,
  errorReason: null
}

export default function validator(state={...INITIAL_STATE}, action) {
  switch (action.type) {
    case INIT_ENDPOINT_VALIDATION:
      const {endpointUrl} = action
      return {...state, state: VALIDATION_STATES.IN_PROGRESS, endpointUrl, errorReason: null}
    case SUCCEED_ENDPOINT_VALIDATION:
      return {...state, state: VALIDATION_STATES.SUCCEEDED, errorReason: null}
    case FAIL_ENDPOINT_VALIDATION:
      return {...state, state: VALIDATION_STATES.FAILED, errorReason: action.reason}
    default:
      return state
  }
}

const initEndpointValidation = endpointUrl => ({type: INIT_ENDPOINT_VALIDATION, endpointUrl})
const succeedEndpointValidation = () => ({type: SUCCEED_ENDPOINT_VALIDATION})
const failEndpointValidation = errorReason => ({type: FAIL_ENDPOINT_VALIDATION, errorReason})

export const doEndpointValidation = endpointUrl => (
  (dispatch, getState) => {
    dispatch(initEndpointValidation(endpointUrl))

    // TODO actual validation

    setTimeout(() => {
      if (Math.random() < 0.5) {
        dispatch(succeedEndpointValidation())
      } else {
        dispatch(failEndpointValidation('Received 500 error'))
      }
    }, 5000)
  }
)
