import {connect} from 'react-redux'
import ValidatePageComponent from '../components/ValidatePage'
import {push} from 'react-router-redux'
import {doEndpointValidation, doAwaitValidation} from '../reducers/validator'

const mapStateToProps = state => {
  const {
    validator: {
      state: validationState,
      errorReason: validationErrorReason,
      isAwaitingValidation
    }
  } = state
  return {validationState, validationErrorReason, isAwaitingValidation}
}

export default connect(
  mapStateToProps,
  {
    doEndpointValidation,
    doAwaitValidation
  }
)(ValidatePageComponent)
