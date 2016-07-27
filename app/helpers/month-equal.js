import Ember from "ember";

export default Ember.Helper.helper(function([selected, index]) {
  return selected+1 === index;
});
