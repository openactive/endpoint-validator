import 'babel-polyfill'
import validateEndpointUrl from './validateEndpointUrl'

export function validate(url) {
    return validateEndpointUrl(url)
      .then(() => ({success: true, message: "success"}),
            err => ({success: false, error: err.name, message: err.message}));
}

export function handler(event, context) {
  validate(event.queryParams.url)
    .then(res => {
      console.log("IN THE HANDLER")
      console.log(JSON.stringify(res))
      context.succeed(res);
    })
}