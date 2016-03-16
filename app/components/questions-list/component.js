import Ember from 'ember';

export default Ember.Component.extend({
	actions: {
		answer: function(answer, askid) {
			console.log('askid,answer', askid, answer);

			var store = this.store;
			var savedCallback = function() {
				console.log('saved ask');
			};

			store.findRecord('ask', askid).then(function(ask){
				ask.set('answer', answer);
				ask.save().then(savedCallback);
			})
		}
	}
});
