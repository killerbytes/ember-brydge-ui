import Ember from 'ember';
import moment from 'moment';

export function getShortString(params) {
  console.log('<<< getShortString', params[0]);
  return params[0].length > 20 ? params[0].substr(0, 20) + ' ...' : params[0];
}

export default Ember.Helper.helper(getShortString);
