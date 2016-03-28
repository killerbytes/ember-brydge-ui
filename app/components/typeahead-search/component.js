import Ember from 'ember';

export default Ember.Component.extend({
	selectionObserver: function () { 
		var text = this.get('selection').get('text');
		var code = this.get('selection').get('id');
		var id = this.get('id');
		
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