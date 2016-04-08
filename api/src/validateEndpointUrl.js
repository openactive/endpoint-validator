import fetch from 'isomorphic-fetch'
import moment from 'moment'
import t, {validate} from 'tcomb-validation'
import {HttpError, InvalidJsonError, JsonSchemaError} from './errors'

const checkResponseForHttpError = response => {
  if (response.status >= 400) {
    throw new HttpError(response.status)
  }
  return response
}

const convertToJson = response => {
  return response.json().catch(() => {
    throw new InvalidJsonError()
  })
}

const isDateString = string => (
  moment(string).isValid()
)

const DateType = t.subtype(t.String, string => moment(string).isValid(), 'Date')

const ItemSchema = t.struct({
  state: t.enums.of(['updated', 'deleted'], 'Item State'),
  kind: t.enums.of(['session', 'event'], 'Item Kind'),
  id: t.union([t.String, t.Number]),
  modified: t.union([DateType, t.Number]),
  data: t.Any
})

const ResponseSchema = t.struct({
  items: t.list(ItemSchema),
  next: t.String
})

const joinValidationErrors = errors => {
  if (errors.length < 10) {
    return errors.map(err => err.message).join(', ')
  } else {
    return errors.slice(0, 10).map(err => err.message).join(', ') + ' ...'
  }
}

const validateJsonData = data => {
  const result = validate(data, ResponseSchema)
  if (!result.isValid()) {
    throw new JsonSchemaError(`[${joinValidationErrors(result.errors)}]`)
  }
}

export default function validateEndpointUrl(endpointUrl) {
  return fetch(endpointUrl)
    .then(checkResponseForHttpError)
    .then(convertToJson)
    .then(validateJsonData)
}
