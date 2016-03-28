import Ember from 'ember';

export default Ember.Component.extend({
	actions: {
		save: function () {
			this.get('model').save().then(()=>{
				console.log('success saved');
			});
		}
	}
});
