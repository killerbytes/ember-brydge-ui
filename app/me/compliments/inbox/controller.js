import Ember from 'ember';

export default Ember.Controller.extend({
	list: Ember.computed.filterBy('model', 'status', 'pending')
});
