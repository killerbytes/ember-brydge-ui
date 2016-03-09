import Ember from 'ember';

export default Ember.Route.extend({
	model: function() {
		return {
			firstName: 'Hein',
			lastName: 'Zeya',
			works: [{
				id:1,
				company: 'Cromly',
				title: 'Snr. Software Engineer'
			},{
				id:2,
				company: 'Skoolbo',
				title: 'Software Engineer'
			},{
				id:3,
				company: 'Applied-Mesh',
				title: 'Snr. Software Engineer'
			}]
		}
	},

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
		},

		saveWork: function() {
			console.log('saveWork from route');
		},

		updateProfile: function(data) {
			console.log('update data', data);
		}
	}
});
