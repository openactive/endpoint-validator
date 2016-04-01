import validateEndpointUrl from './validateEndpointUrl'

export function validate(url) {
  return validateEndpointUrl(url);
}

function handler(event, context) {
  context.succeed("Hello API validator!")
}
