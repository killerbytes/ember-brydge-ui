import Ember from 'ember';

export default Ember.Component.extend({
	actions: {
		ask: function(to, from, question) {
			console.log('to/from/question', to,from,question);

			var store = this.store;

			store.createRecord('ask', {
				content: question,
				toid: to,
				fromid: from
			});

			var ask = store.createRecord('ask',{
				content: question
			});

			var savedCallback = function() {
				console.log('saved ask');
			};

			store.findRecord('user', from).then(function(user) {
				ask.set('from', user);

				store.findRecord('user', to).then(function(user) {
					ask.set('to', user);

					ask.save().then(savedCallback);
					
				})
			})
		}
	}
});
