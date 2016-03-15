import React, {Component, PropTypes} from 'react'
import {Grid, Row, Col, Alert} from 'react-bootstrap'
import UrlForm from '../components/UrlForm'
import {VALIDATION_STATES} from '../reducers/validator'

export default class ValidatePage extends Component {
  static propTypes = {
    doEndpointValidation: PropTypes.func.isRequired,
    push: PropTypes.func.isRequired,

    validationState: PropTypes.string,
    validationErrorReason: PropTypes.string
  };

  doValidateUsingQueryParams(queryParams) {
    const {url} = queryParams
    this.props.doEndpointValidation(url)
  }

  doValidateUsingQueryParamsIfChanged(lastQueryParams, newQueryParams) {
    if (lastQueryParams.url !== newQueryParams.url) {
      this.doValidateUsingQueryParams(newQueryParams)
    }
  }

  componentDidMount() {
    this.doValidateUsingQueryParams(this.props.location.query)
  }

  componentDidUpdate(prevProps) {
    this.doValidateUsingQueryParamsIfChanged(prevProps.location.query, this.props.location.query)
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
    const {setEndpointUrl, push, validationState} = this.props
    return (
      <Grid>
        <Row>
          <Col xs={12}>
            <UrlForm push={push} validationState={validationState} />
          </Col>
        </Row>
        {this.renderValidationResult()}
      </Grid>
    )
  }
}
