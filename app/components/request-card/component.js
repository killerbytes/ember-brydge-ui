import Ember from 'ember';

export default Ember.Component.extend({
	user: Ember.computed('item.userid', function(){
		return this.get('item.userid');
	}),
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
