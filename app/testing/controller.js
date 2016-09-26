import Ember from 'ember';

export default Ember.Controller.extend({
  queryParams: ['industry'],
  industry: [],
  favorite: ["20102", "20103", "20105"],
  industryPicker: Ember.inject.service(),
  actions: {
    submit(item){
      console.log(item)
      this.set('favorite', item)
    }
  }

});
