import Ember from 'ember';

export default Ember.Controller.extend({
  date: Ember.computed(function(){
    return null;//moment("2/15/1979", "DD");
  })
});
