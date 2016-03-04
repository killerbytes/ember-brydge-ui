export function initialize( appInstance ) { 
  appInstance.store = appInstance.lookup("service:store");
  window.App = appInstance;
}

export default {
  name: 'application',
  initialize: initialize
};