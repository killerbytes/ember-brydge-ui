import Ember from 'ember';

export default Ember.Component.extend({
	ajax: Ember.inject.service(),
	connection: Ember.inject.service(),
	store: Ember.inject.service(),
	actions: {	
		reject: function() {
			this.get('connection').reject(this.get('model.from.userid'))
			.then(res =>{
				var connection = this.get('store').peekRecord('connection', res.data.id);
				connection.set('status','reject');
				$('#rejectFormModal').foundation('close');
			});
		}
	}
});
