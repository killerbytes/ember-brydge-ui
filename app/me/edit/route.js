import Ember from 'ember';

export default Ember.Route.extend({
	profileid: null,

	model: function(params) {
		const profileId = params.profile_id;
		this.profileid = profileId;
		
		console.log('GET /profiles/',profileId, params);

		//return this.store.findRecord('profile', params.profile_id);

		return Ember.RSVP.hash({
      profile: this.store.findRecord('profile', params.profile_id)
    });
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

		saveWork: function(company, title, desc) {
			console.log('saveWork from route',company, title, desc);
			
			let profile = this.store.peekRecord('profile', this.profileid);
			let work = this.store.createRecord('work-experience', {
				company: company,
				jobTitle: title,
				description: desc
			});
			profile.get('works').pushObject(work);
			work.save();
		},

		updateProfile: function(data) {
			console.log('update data', data);
		}
	}
});







