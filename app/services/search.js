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
  query(q)  {

		this.get('store').query('search', { "q": q, "type": 'profile' }).then((res)=>{
			this.set('results', res);
		})  	
  },


});

