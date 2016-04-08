import React, {Component, PropTypes} from 'react'
import {Grid, Row, Col} from 'react-bootstrap'
import UrlForm from '../components/UrlForm'

export default class LandingPage extends Component {
  static propTypes = {
    doAwaitValidation: PropTypes.func.isRequired,

    validationState: PropTypes.string
  };

  render() {
    const {doAwaitValidation, validationState} = this.props
    return (
      <Grid>
        <Row>
          <Col xs={12}>
            <UrlForm doAwaitValidation={doAwaitValidation} validationState={validationState} />
          </Col>
        </Row>
      </Grid>
    )
  }
}
