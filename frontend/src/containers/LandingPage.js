import {connect} from 'react-redux'
import LandingPageComponent from '../components/LandingPage'
import {push} from 'react-router-redux'
import {doAwaitValidation} from '../reducers/validator'

const mapStateToProps = state => {
  const {
    validator: {
      state: validationState
    }
  } = state
  return {validationState}
}

export default connect(
  mapStateToProps,
  {
    doAwaitValidation
  }
)(LandingPageComponent)
