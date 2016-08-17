import Ember from 'ember';
import moment from 'moment';

export function getShortString(params) {
  return params[0].length > 20 ? params[0].substr(0, 20) + ' ...' : params[0];
}

export default Ember.Helper.helper(getShortString);
