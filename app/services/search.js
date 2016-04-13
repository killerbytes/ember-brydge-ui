import Ember from 'ember';
const {
  Component,
  computed,
  getOwner
} = Ember;


export default Ember.Service.extend({
  store: Ember.inject.service(),
  session: Ember.inject.service(),
  ajax: Ember.inject.service(),
	shouldDropdown: Ember.computed('results', function(){
		return getOwner(this).lookup('controller:application').currentPath != 'testing' ? true : false;
	}),
  results: [],
  query(q)  {

  	// this.get('store').findAll('search').then((res)=>{
  	// 	this.set('results', res)
  	// })
		this.get('store').query('search', { "query": 'ca', "type": 'profile' }).then((res)=>{
			this.set('results', res);
		})  	
  },


});

