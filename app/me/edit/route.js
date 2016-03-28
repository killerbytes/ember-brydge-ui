import Ember from 'ember';

export default Ember.Route.extend({
	profileid: null,

	propertyObserver: function () {
    var firstName = this.get('model.firstName');
    console.log('changes firstName (Route) =>', firstName);
  }.observes('model.firstName'),


	model: function(params) {
		const profileId = params.profile_id;
		this.profileid = profileId;
		
		console.log('GET /profiles/',profileId, params);

		return this.store.findRecord('profile', params.profile_id);
	},

	setupController: function(controller, model) {
		
		console.log('<<<< setupController ',model.get('firstName'),
  		model.get('lastName'),
  		model.get('location'),
  		model.get('industry'));

	  controller.set('chosenIndustry',{
	  	text: model.get('industry')
	  });

	  controller.set('chosenOccupOne',{
	  	text: model.get('occupationOne')
	  });

	  controller.set('chosenOccupTwo',{
	  	text: model.get('occupationTwo')
	  });

	  controller.set('model', model);
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
			// console.log('saveWork from route',company, title, desc);
			
			// let profile = this.store.peekRecord('profile', this.profileid);
			// let work = this.store.createRecord('work-experience', {
			// 	company: company,
			// 	jobTitle: title,
			// 	description: desc
			// });
			// profile.get('works').pushObject(work);
			// work.save();
		},

		updateProfile: function(data) {
			console.log('update data', data);
		},

		saveIndustry: function(industry, 
			occupationOne, occupationTwo,
			industryId, occupationOneId, occupationTwoId) {
	      console.log('<<< route',
	      	industry, occupationOne, occupationTwo,
	      	industryId, occupationOneId, occupationTwoId);

	      this.store.findRecord('profile', this.profileid).then(function(p){

					p.set('industry', industry);
					p.set('occupationOne', occupationOne);
					p.set('occupationTwo', occupationTwo);

					p.set('industryId', industryId);
					p.set('occupationOneId', occupationOneId);
					p.set('occupationTwoId', occupationTwoId);

					p.save().then(function(){
						console.log('profile save success');
						alert('Success');
					});
				});
	    }
	}
});







