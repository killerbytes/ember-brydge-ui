import Ember from 'ember';
export default Ember.Component.extend({
  industryPicker: Ember.inject.service(),
  didInsertElement(){
    this._super(...arguments);
    Ember.run.later(function(){
      $('#industry-picker').foundation('open');
    })
  },
  // _setActive: Ember.observer('industryPicker.active', function(){
  //   console.log(this.get('industryPicker.active'))
  // }),
  actions: {
    set(){
      this.get('industryPicker.industries').pushObject(this.get('industryPicker.active.id'))
    },
    reset(){
      console.log('reset')
    }
  }
});
