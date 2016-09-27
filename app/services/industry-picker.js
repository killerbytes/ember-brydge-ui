import Ember from 'ember';


export default Ember.Service.extend({
  store: Ember.inject.service(),
  industries: [],
  load(id){
    this.set('isLoading', true);
		this.get('store').findRecord('industry', id).then(res=>{
			this.set('active', res);
			this.set('isLoading', false);
		})
  },
  remove(item){
    item.set('selected', false);
    this.get('industries').removeObject(item);
  }
});
