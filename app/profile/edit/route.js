import Ember from 'ember';

export default Ember.Route.extend({
	actions: {
		save: function(fname, lname) {
			console.log('save', fname, lname);

			var profile = this.store.createRecord('profile',{
				firstName: fname,
				lastName: lname
			});

			// save profile
			profile.save().then(function(){
				console.log('profile save success');
			});
		}
	}
});
