import Ember from 'ember';

export function getNotificationContent(params) {
  return params[0].length > 80 ? params[0].substr(0, 80) + ' ...' : params[0];
}

export default Ember.Helper.helper(getNotificationContent);
