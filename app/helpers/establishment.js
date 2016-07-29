import Ember from 'ember';

export default Ember.Helper.helper(function([item]) {
  return item.terms[0];
});
