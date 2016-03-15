import React, {Component, PropTypes} from 'react'
import {Input, Button} from 'react-bootstrap'
import {reduxForm} from 'redux-form'
import {VALIDATION_STATES} from '../reducers/validator'

class _InternalForm extends Component {
  static propTypes = {
    fields: PropTypes.shape({
      url: PropTypes.any
    }).isRequired,
    handleSubmit: PropTypes.func.isRequired,
    isValidationInProgress: PropTypes.bool.isRequired
  };

  render() {
    const {
      fields: {url},
      handleSubmit,
      isValidationInProgress
    } = this.props

    return (
      <form onSubmit={handleSubmit}>
        <Input type="text" label="URL to validate" placeholder="e.g. https://my-openactive-endpoint" {...url} />
        <Button
          bsStyle="primary"
          type="submit"
          disabled={isValidationInProgress}
        >
          {isValidationInProgress ? 'Validating...' : 'Validate'}
        </Button>
      </form>
    )
  }
}

const InternalForm = reduxForm({
  form: 'url',
  fields: ['url']
}, state => ({
  initialValues: {
    url: state.validator.endpointUrl
  }
}))(_InternalForm)

export default class UrlForm extends Component {
  static propTypes = {
    doAwaitValidation: PropTypes.func.isRequired,

    validationState: PropTypes.string
  };

  render() {
    const {doAwaitValidation, validationState} = this.props
    const onSubmit = ({url}) => {
      doAwaitValidation(url)
    }
    return <InternalForm onSubmit={onSubmit} isValidationInProgress={validationState === VALIDATION_STATES.IN_PROGRESS} />
  }
}
