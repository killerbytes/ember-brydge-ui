import Ember from 'ember';

export default Ember.Helper.helper(function([date, format]) {
	format = format || 'MMMM YYYY';
  const mo = moment(date);
  return `${mo.format(format)}`;
});
