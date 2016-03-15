import {connect} from 'react-redux'
import ValidatePageComponent from '../components/ValidatePage'
import {push} from 'react-router-redux'
import {doEndpointValidation} from '../reducers/validator'

const mapStateToProps = state => {
  const {
    validator: {
      state: validationState,
      errorReason: validationErrorReason
    }
  } = state
  return {validationState, validationErrorReason}
}

export default connect(
  mapStateToProps,
  {
    doEndpointValidation,
    push
  }
)(ValidatePageComponent)
