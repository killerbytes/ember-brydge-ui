import Ember from 'ember';
import _ from 'lodash/lodash';

export default Ember.Component.extend({
  store: Ember.inject.service(),
  industryPicker: Ember.inject.service(),
  max: 3,
  willDestroyElement(){
		$(`#industry-picker-${this.get('name')}`).parent().remove();
	},
  didReceiveAttrs(){
    this._super(...arguments);
    Ember.run.later(()=>{
      this.set('industryPicker.industries', []);
      console.log(this.get('store').peekAll('industry').filterBy('selected', true))

      this._getSelected();
    })
  },
  didInsertElement(){
    this._super(...arguments);
    Ember.run.later(()=>{
      Ember.$(`#industry-picker-${this.get('name')}`).on('open.zf.reveal', ()=>{
        this.set('industryPicker.active', null);
        console.log('reveal', this.get('industryPicker.active'))
      })
    })

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
    add(item){
      if(this.get('max') == this.get('industryPicker.industries.length')) return false;
      if(!this._industryExist(item.id)) this.get('industryPicker.industries').pushObject(item);
    },
    submit(){
      this.sendAction("submit", this.get('industryPicker.industries'));
      $(`#industry-picker-${this.get('name')}`).foundation('close');
    },
    select(item){
      this.get('industryPicker').load(item.industry_id);
    },
    remove(item){
      this.get('industryPicker').remove(item);
    }
  }
});
