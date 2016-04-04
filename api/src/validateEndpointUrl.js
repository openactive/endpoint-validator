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
  kind: t.enums.of(['session'], 'Item Kind'),
  id: t.union([t.String, t.Number]),
  modified: DateType,
  data: t.Any
})

const ResponseSchema = t.struct({
  items: t.list(ItemSchema),
  next: t.String
})

const validateJsonData = data => {
  const result = validate(data, ResponseSchema)
  if (!result.isValid()) {
    throw new JsonSchemaError(result.firstError())
  }
}

export default function validateEndpointUrl(endpointUrl) {
  return fetch(endpointUrl)
    .then(checkResponseForHttpError)
    .then(convertToJson)
    .then(validateJsonData)
}
