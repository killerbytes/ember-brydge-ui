import Ember from 'ember';

export default Ember.Component.extend({
	classNames: ['box'],
	session: Ember.inject.service(),
	compliment: Ember.inject.service(),
	isOwner: Ember.computed('item', function(){
		console.log(this.get('item.to.id'), this.get('session.data.authenticated.user_id'))
		return this.get('item.to.id') == this.get('session.data.authenticated.user_id');
	}),
	actions: {
		accept: function (item) {
			this.get('compliment').accept(item).then(res=>{
				this.sendAction('onSubmit');				
			});
		},
		delete: function (item) {
			this.get('compliment').delete(item).then(res=>{
				this.sendAction('onDelete', item);
				this.sendAction('onSubmit');
			})
		}
	}
});
