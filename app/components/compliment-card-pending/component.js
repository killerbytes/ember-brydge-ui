import Ember from 'ember';

export default Ember.Component.extend({
	classNames: ['box'],
	session: Ember.inject.service(),
	compliment: Ember.inject.service(),
	isOwners: Ember.computed('item', function(){
		return this.get('item.to.id') == this.get('session.data.authenticated.user_id') || this.get('item.from.id') == this.get('session.data.authenticated.user_id');
	}),
	isOwner: Ember.computed('item', function(){
		console.log(this.get('item.to.id'), this.get('session.data.authenticated.user_id'))
		return this.get('item.to.id') == this.get('session.data.authenticated.user_id');
	}),
	actions: {
		accept: function (item) {
			this.get('compliment').accept(item).then(res=>{
				this.sendAction('submit');
			});
		},
		delete: function () {
			this.get('compliment').delete(this.get('item')).then(res=>{
				this.sendAction('submit');
			})
		}
	}
});
