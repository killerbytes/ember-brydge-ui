import Ember from 'ember';

export default Ember.Controller.extend({
  queryParams: ['industry'],
  industry: [],
  industryPicker: Ember.inject.service(),
  selected: Ember.computed('industry', function(){
    return this.get('industry');
  }),
  actions: {
  }
});
