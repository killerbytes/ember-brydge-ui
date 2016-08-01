import Ember from 'ember';

export default Ember.Component.extend({
	session: Ember.inject.service(),
	compliment: Ember.inject.service(),
	classNames: ['box', 'cards'],
	isOwners: Ember.computed('item', function(){
		return this.get('item.to.id') == this.get('session.data.authenticated.user_id') || this.get('item.from.id') == this.get('session.data.authenticated.user_id');
	}),
	isOwner: Ember.computed('item', function(){
		return this.get('item.to.id') == this.get('session.data.authenticated.user_id');
	}),
	actions: {
		delete(){
			this.get('compliment').delete(this.get('item'));
		}
	}
});
