import Ember from 'ember';

export default Ember.Component.extend({
	ajax: Ember.inject.service(),
	connection: Ember.inject.service(),
	store: Ember.inject.service(),
	actions: {
		accept: function() {
			this.get('connection').accept(this.get('model.from.userid'))
			.then(res =>{
				var connection = this.get('store').peekRecord('connection', res.data.id);
				connection.set('status','accepted');
				$('#acceptFormModal').foundation('close');
			});
		}
	}
});
