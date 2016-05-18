import Ember from 'ember';

export default Ember.Component.extend({
	store: Ember.inject.service(),
	sessionAccount: Ember.inject.service(),
	actions: {
		ask: function() {
			var store = this.get('store');
			var ask = store.createRecord('ask',{
				content: this.get('question')
			});
			var savedCallback = () => {
				this.sendAction('action', this.get('model.id'));
				this.$('#'+this.get('name')).foundation('close')
			};
			ask.set('from', this.get('from.user'));
			store.findRecord('user', this.get('model.id')).then((user)=>{
				ask.set('to', user);
				this.set('question', null)
				ask.save().then(savedCallback);					
			})
		}
	}
});
