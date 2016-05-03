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
		return getOwner(this).lookup('controller:application').currentPath != 'search' ? true : false;
	}),
  results: [],
  key: null,
  query(params)  {

		this.get('store').query('search', params).then((res)=>{
			this.set('results', res);
		})  	
  },


});

