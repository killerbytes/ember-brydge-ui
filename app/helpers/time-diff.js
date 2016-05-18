import Ember from 'ember';

export default Ember.Helper.helper(function([a,b]){
  const date1 = moment(a);
  const date2 = moment(b)
  const mo = date2.diff(date1, 'months');
  return  (mo / 12) > 1 ? (mo/12).toFixed(1) + ' Years': mo + ' Months' ;

});
