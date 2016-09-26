import Ember from 'ember';
import _ from 'lodash/lodash';

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
      return i.id==id;
    });
  },
  actions: {
    select(item){
      if(!this._industryExist(item.id)) this.get('industryPicker.industries').pushObject(item);
    },
    submit(){
      this.set('value', _.map(this.get('industryPicker.industries'), 'id'));
    }
  }
});
