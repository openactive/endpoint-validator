import 'babel-polyfill'
import validateEndpointUrl from './validateEndpointUrl'

export function validate(url) {
    return validateEndpointUrl(url)
      .then(() => ({success: true, message: "success"}),
            err => ({success: false, message: err.message}));
}

export function handler(event, context) {
  validate("https://demo0023140.mockable.io/getSessions")
    .then(res => {
      console.log("IN THE HANDLER")
      console.log(JSON.stringify(res))
      context.succeed(res);
    })
}
