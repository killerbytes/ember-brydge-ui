import Ember from 'ember';

export default Ember.Component.extend({
	actions: {
		save: function () {
			this.get('profile').save().then(()=>{
				console.log('snapshot saved');
			});
		}
	}
});
