import Ember from 'ember';

export default Ember.Component.extend({
	actions: {
		queryAction: function(query, deferred) {
      this.store.query('category', { q: query.term })
        .then(deferred.resolve, deferred.reject);
    }
	}
});
