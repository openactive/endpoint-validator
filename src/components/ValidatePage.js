import React, {Component, PropTypes} from 'react'
import {Grid, Row, Col, Alert} from 'react-bootstrap'
import UrlForm from '../components/UrlForm'
import {VALIDATION_STATES} from '../reducers/validator'

export default class ValidatePage extends Component {
  static propTypes = {
    doEndpointValidation: PropTypes.func.isRequired,
    doAwaitValidation: PropTypes.func.isRequired,

    validationState: PropTypes.string,
    validationErrorReason: PropTypes.string,
    isAwaitingValidation: PropTypes.bool.isRequired
  };

  doValidateUsingQueryParams() {
    const {
      isAwaitingValidation,
      doEndpointValidation,
      location: {
        query: {url}
      }
    } = this.props
    if (isAwaitingValidation) {
      doEndpointValidation(url)
    }
  }

  componentDidMount() {
    this.doValidateUsingQueryParams()
  }

  componentDidUpdate(prevProps) {
    this.doValidateUsingQueryParams()
  }

  renderValidationResult() {
    const {validationState, validationErrorReason} = this.props
    if (!validationState || validationState === VALIDATION_STATES.IN_PROGRESS) { return null }
    else {
      let alert
      if (validationState === VALIDATION_STATES.SUCCEEDED) {
        alert = (
          <Alert bsStyle="success">
            <strong>Success!</strong> Endpoint validated successfully 
          </Alert>
        )
      } else if (validationState === VALIDATION_STATES.FAILED) {
        alert = (
          <Alert bsStyle="danger">
            <strong>Error!</strong> {validationErrorReason}
          </Alert>
        )
      }
      return (
        <Row>
          <Col xs={12}>
            {alert}
          </Col>
        </Row>
      )
    }
  }

  render() {
    const {doAwaitValidation, validationState} = this.props
    return (
      <Grid>
        {this.renderValidationResult()}
        <Row>
          <Col xs={12}>
            <UrlForm doAwaitValidation={doAwaitValidation} validationState={validationState} />
          </Col>
        </Row>
      </Grid>
    )
  }
}
