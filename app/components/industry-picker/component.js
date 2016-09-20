import Ember from 'ember';
export default Ember.Component.extend({
  industryPicker: Ember.inject.service(),
  didInsertElement(){
    this._super(...arguments);
    Ember.run.later(function(){
      $('#industry-picker').foundation('open');
    })
  },
  actions: {
    set(){
      this.get('industryPicker.industries').pushObject(this.get('industryPicker.selected.id'))
    }
  }
});
