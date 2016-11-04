import Ember from 'ember';
import _ from 'lodash/lodash';

export default Ember.Component.extend({
  store: Ember.inject.service(),
  ajaxApi: Ember.inject.service(),
  industryPicker: Ember.inject.service(),
  max: 3,
  willDestroyElement(){
		$(`#industry-picker-mobile-${this.get('name')}`).remove();
	},
  didReceiveAttrs(){
    this._super(...arguments);
    Ember.run.later(()=>{
      this.get('store').peekAll('industry').filterBy('selected', true).forEach(i=>{
        i.set('selected', false);
      })
    })
  },
  didInsertElement(){
    this._super(...arguments);
    Ember.run.later(()=>{
      Ember.$(`#industry-picker-mobile-${this.get('name')}`).on('open.zf.reveal', ()=>{
        this.get("store").peekAll('industry').filterBy('active', true).forEach(i=>{
          i.set('active', false);
        })
        this.set('industryPicker.active', null);
        this.get('ajaxApi').request('/v2/industries').then(res=>{
          if(!this.get('industries')) this.set('industries', res);
        })
      })
    })
  },
  _getActive: Ember.observer('industryPicker.active', function(){
    this._reset();
  }),
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
  _reset(){
    if(this.get('isDestroyed') || this.get('isDestroying')) return false;
    this.set('message', null);
  },
  actions: {
    add(item){
      if(this.get('max') == this.get('industryPicker.industries.length')) return false;
      if(!this._industryExist(item.id)) this.get('industryPicker.industries').pushObject(item);
      this.set('message', "Added to Your Selections");
      Ember.run.later(()=>{
        this._reset();
      }, 5000)
    },
    submit(){
      this.sendAction("submit", this.get('industryPicker.industries'));
      $(`#industry-picker-mobile-${this.get('name')}`).foundation('close');
    },
    select(item){
      this.get('industryPicker').load(item.industry_id);
    },
    remove(item){
      this.get('industryPicker').remove(item);
    },
    back(){
      this.set('industryPicker.active', false);
    }
  }
});
