import Ember from 'ember';

export default Ember.Helper.helper(function([location]) {
  return location.terms.join(', ');
});


