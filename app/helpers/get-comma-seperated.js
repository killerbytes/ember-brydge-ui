import Ember from 'ember';

export function getCommaSeperated(value, options) {
  console.log('highlight =>',value[0])
  if(value[0] === null) return '';
  return value[0].state + ',' + value[0].city + ',' + value[0].country;
}

export default Ember.Helper.helper(getCommaSeperated);
