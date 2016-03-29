import Ember from 'ember';

export default Ember.Component.extend({
	selectionObserver: function () { 
		let text = this.get('selection').get('text');
		let code = this.get('selection').get('id');
		let id = this.get('id');
		
	  this.sendAction('action', id, code, text);


	}.observes('selection'),

	actions: {
		queryCategories: function(query, deferred) {
      this.store.query('category', { q: query.term })
        .then(deferred.resolve, deferred.reject);
    },

    didSelect: function(value) {
    	console.log('<< selectedValue', value);
      this.set('selectedValue',value);
    }
	}
});