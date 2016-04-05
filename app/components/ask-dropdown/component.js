import Ember from 'ember';

export default Ember.Component.extend({
	actions: {
		ask: function(to, from, username,question) {
			console.log('ask dropdown to/from/username/question', to,from,username,question);
			var _this = this;
			var store = this.store;

			var ask = store.createRecord('ask',{
				content: question
			});

			var savedCallback = function() {
				console.log('saved ask');
				_this.sendAction('action', username);
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
