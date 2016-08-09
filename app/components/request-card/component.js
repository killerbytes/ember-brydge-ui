import Ember from 'ember';

export default Ember.Component.extend({
	actions: {
		accept: function(item){
			item.set('status', 'accepted')
			item.save();
		},
		reject: function(item) {
			item.destroyRecord();
		}
	}
});
