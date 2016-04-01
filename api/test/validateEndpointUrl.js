import express from 'express'
import validateEndpointUrl from '../src/validateEndpointUrl'
import {JsonSchemaError, InvalidJsonError, HttpError} from '../src/errors'

const MOCK_API_PORT = process.env.MOCK_API_PORT || 3003
const MOCK_API_URL = `http://localhost:${MOCK_API_PORT}/`

const runServer = (handler, callback) => {
  return new Promise((resolve, reject) => {
    const app = express()
    app.get('/', handler)
    const server = app.listen(MOCK_API_PORT, () => {
      const closeServerAnd = fn => (
        (...args) => {
          server.close()
          return fn(...args)
        }
      )
      Promise.resolve(callback())
        .then(closeServerAnd(resolve), closeServerAnd(reject))
    })
  })
}

const send500Handler = (req, res) => {
  res.status(500).send('Internal Server Error')
}

const jsonHandler = json => (
  (req, res) => {
    res.status(200).type('application/json').send(json)
  }
)

const assertThrows = (errorType, promise) => {
  return promise.then(() => {
    throw new Error('Did not throw')
  }, error => {
    if (error.name === errorType.name) {
      // Did throw correctly
    } else {
      throw new Error(`Incorrect error type thrown. ${error.name} instead of ${errorType.name}`)
    }
  })
}

const chainPromises = fns => (
  fns.reduce((promiseChain, fn) => (
    promiseChain.then(fn)
  ), Promise.resolve())
)

const ERRANT_SCHEMA_JSONS = [
  // Missing 'next' field
  {
    items: []
  },
  // item missing 'id' field
  {
    items: [{
      state: 'Updated',
      kind: 'session',
      modified: '2016-03-29T14:00:00.000Z',
      data: {}
    }],
    next: '/?from=2016-03-29T14:00:00.000Z&after=1'
  }
].map(x => JSON.stringify(x))

const VALID_SCHEMA_JSON = {
  items: [{
    state: 'Updated',
    kind: 'session',
    modified: '2016-03-29T14:00:00.000Z',
    id: 1,
    data: {}
  }],
  next: '/?from=2016-03-29T14:00:00.000Z&after=1'
}

describe('Enpoint URL validation', () => {
  it('should throw on HTTP errors', () => {
    return runServer(send500Handler, () => {
      return assertThrows(HttpError, validateEndpointUrl(MOCK_API_URL))
    })
  })
  it('should throw on invalid JSON', () => {
    return runServer(jsonHandler('{"items": [], "next":'), () => {
      return assertThrows(InvalidJsonError, validateEndpointUrl(MOCK_API_URL))
    })
  })
  it('should throw on missing fields', () => {
    const assertJsonThrows = jsonString => (
      () => {
        return runServer(jsonHandler(jsonString), () => {
          return assertThrows(JsonSchemaError, validateEndpointUrl(MOCK_API_URL))
        })
      }
    )
    return chainPromises(ERRANT_SCHEMA_JSONS.map(assertJsonThrows))
  })
  it('should validate on successful schema', () => {
    return runServer(jsonHandler(VALID_SCHEMA_JSON), () => {
      return validateEndpointUrl(MOCK_API_URL)
    })
  })
})
