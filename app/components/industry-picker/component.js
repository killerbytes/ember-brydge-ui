import Ember from 'ember';
import _ from 'lodash/lodash';

export default Ember.Component.extend({
  store: Ember.inject.service(),
  industryPicker: Ember.inject.service(),
  max: 3,
  didReceiveAttrs(){
    this._super(...arguments);
    Ember.run.later(()=>{
      this.set('industryPicker.industries', []);
      this._getSelected();
    })

  },
  didInsertElement(){
    this._super(...arguments);
    // Ember.run.later(function(){
    //   $('#industry-picker').foundation('open');
    // })
  },
  _getSelected(){
    if(!this.get('selected')) return false;
    this.get('selected').forEach(i=>{
      this.get('store').findRecord('industry', i).then(res=>{
        this.get('industryPicker.industries').pushObject(res);
      })
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
      if(this.get('max') == this.get('industryPicker.industries.length')) return false;
      if(!this._industryExist(item.id)) this.get('industryPicker.industries').pushObject(item);
    },
    submit(){
      this.sendAction("submit", this.get('industryPicker.industries'));
      $('#industry-picker').foundation('close');
    },
    remove(item){
      this.get('industryPicker').remove(item);
    }
  }
});
