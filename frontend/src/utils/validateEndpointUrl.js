import fetch from 'isomorphic-fetch'

export class ValidationError extends Error {
  constructor(errorType, message) {
    super()
    this.message = `${errorType}: ${message}`
  }
}

export default function validateEndpointUrl(endpointUrl) {
  const apiCall = `https://validator.openactive.io?url=${endpointUrl}`
  return fetch(apiCall)
    .then(res => {
      console.log(json);
      const json = res.json();
      return json;
    })
    .then(json => {
      if (json.success) {
        return;
      } else {
        throw new ValidationError(json.error, json.message)
      }
    })
}
