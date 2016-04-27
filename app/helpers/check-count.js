import Ember from 'ember';

export function checkCount(count) {
  return count[0] > 0 ? 'block': 'none'
}

export default Ember.Helper.helper(checkCount);
