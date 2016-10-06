import Ember from 'ember';

export default Ember.Helper.helper(function([status]) {
  return status == 'pending' ? 'Invited' : 'Used';
});
