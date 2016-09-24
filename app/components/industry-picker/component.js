import Ember from 'ember';
export default Ember.Component.extend({
  industryPicker: Ember.inject.service(),
  didInsertElement(){
    this._super(...arguments);
    Ember.run.later(function(){
      $('#industry-picker').foundation('open');
    })
  },
  _industryExist(id){
    if(!this.get('industryPicker.industries')) return true;
    return this.get('industryPicker.industries').find(i=>{
      return i==id;
    });
  },
  actions: {
    set(id){
      console.log(this._industryExist(id))
      // this.get('industryPicker.industries').pushObject(this.get('industryPicker.active.id'))
    },
    reset(){
      console.log('reset')
    }
  }
});
