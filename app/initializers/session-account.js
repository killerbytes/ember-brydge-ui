export function initialize(application) {
  // application.inject('route', 'foo', 'service:foo');
  application.inject('route', 'sessionAccount', 'service:session-account');

}

export default {
  name: 'session-account',
  initialize
};
