import Ember from 'ember';

export default Ember.Controller.extend({
	toPending: Ember.computed.filterBy('model.toCompliments', 'status', 'pending'),
	toAccept: Ember.computed.filterBy('model.toCompliments', 'status', 'accept')
});