import Ember from 'ember';
import moment from 'moment';

export function postDateFormat(params) {

  const one_day = 1000 * 60 * 60 * 24;
  const mo = moment(params[0]);

  var date1_ms = mo.toDate().getTime();
  var date2_ms = new Date().getTime();

  var difference_ms = date2_ms - date1_ms;

  var betweenDays = Math.round(difference_ms/one_day);

  if (betweenDays < 1) {
    return `Today at ${mo.format('h:mmA')}`;
  }

  if (betweenDays < 2) {
    return `Yesterday at ${mo.format('h:mmA')}`;
  }

  return `${mo.format('MMMM D \\at h:mmA')}`;
}

export default Ember.Helper.helper(postDateFormat);
