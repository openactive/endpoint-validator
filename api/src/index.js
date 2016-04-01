import validateEndpointUrl from './validateEndpointUrl'

export function validate(url) {
    return validateEndpointUrl(url)
      .then(() => ({success: true, message: "success"}),
            err => ({success: false, message: err.message}));
}

function handler(event, context) {
  context.succeed("Hello API validator!")
}
