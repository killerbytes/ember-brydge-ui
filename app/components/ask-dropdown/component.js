import Ember from 'ember';

export default Ember.Component.extend({
	store: Ember.inject.service(),
	actions: {
		ask: function(to, from, username,question) {
			var store = this.get('store');
			var ask = store.createRecord('ask',{
				content: question
			});

			var savedCallback = () => {
				this.sendAction('action', this.get('model.id'));
				this.$('#'+this.get('name')).foundation('close')
			};
			
			store.findRecord('user', this.get('from')).then((user)=>{
				ask.set('from', user);
				store.findRecord('user', this.get('model.id')).then((user)=>{
					ask.set('to', user);
					ask.save().then(savedCallback);					
				})
			})
		}
	}
});
