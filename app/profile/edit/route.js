import Ember from 'ember';

export default Ember.Route.extend({
	profileid: null,

	model: function(params) {
		// return {
		// 	firstName: 'Hein',
		// 	lastName: 'Zeya',
		// 	works: [{
		// 		id:1,
		// 		company: 'Cromly',
		// 		title: 'Snr. Software Engineer'
		// 	},{
		// 		id:2,
		// 		company: 'Skoolbo',
		// 		title: 'Software Engineer'
		// 	},{
		// 		id:3,
		// 		company: 'Applied-Mesh',
		// 		title: 'Snr. Software Engineer'
		// 	}]
		// }

		const profileId = params.profile_id;
		this.profileid = profileId;
		
		console.log('GET /profiles/',profileId, params);

		return this.store.findRecord('profile', params.profile_id);
	},

	actions: {
		save: function(fname, lname, location) {
			console.log('save', fname, lname, location,  this.profileid);

			this.store.findRecord('profile', this.profileid).then(function(p){

				p.set('firstName', fname);
				p.set('lastName', lname);
				p.set('location', location);

				p.save().then(function(){
					console.log('profile save success');
					alert('Success');
				});
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
