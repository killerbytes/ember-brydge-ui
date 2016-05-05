import Ember from 'ember';

export default Ember.Helper.helper(function([key, type]){
  return key == type ? true: false;
});
