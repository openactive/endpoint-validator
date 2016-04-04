export class HttpError extends Error {
  constructor(code) {
    super()
    this.name = 'HttpError'
    this.message = `Received error code ${code} from endpoint`
  }
}

export class InvalidJsonError extends Error {
  constructor() {
    super()
    this.name = 'InvalidJsonError'
    this.message = 'Response returned from endpoint was not valid JSON'
  }
}

export class JsonSchemaError extends Error {
  constructor(message) {
    super()
    this.name = 'JsonSchemaError'
    this.message = message
  }
}
