export class HttpError extends Error {
  constructor(code) {
    super()
    this.name = 'HttpError'
    this.message = `HTTP Error: Received error code ${code} from endpoint`
  }
}

export class InvalidJsonError extends Error {
  constructor() {
    super()
    this.name = 'InvalidJsonError'
    this.message = 'Invalid JSON'
  }
}

export class JsonSchemaError extends Error {
  constructor(message) {
    super()
    this.name = 'JsonSchemaError'
    this.message = `JSON Schema Error: ${message}`
  }
}
