import Ember from 'ember';

export default Ember.Route.extend({
	model: function (params) {
		this.profileid = params.profile_id;

		return Ember.RSVP.hash({
	    educations: this.store.findAll('education'),
	    experiences: this.store.findAll('experience'),
	    profile: this.store.peekRecord('profile', params.profile_id),
      locations: [{
          id: 1,
          name: "San Francisco, CA, USA"
        },{
          id: 2,
          name: "San Diego, CA, USA"
        },{
          id: 3,
          name: "San Andreas, CA, USA"
        },{
          id: 4,
          name: "Los Angeles, CA, USA"
        },{
          id: 5,
          name: "Houston, TX, USA"
        }]

	  });
	},

  setupController: function(controller, models) {
    var educations = models.educations;
    var experiences = models.experiences;
    var profile = models.profile;
    controller.set('educations', educations);
    controller.set('experiences', experiences);
    controller.set('profile', profile);
    controller.set('industry',{
      text: profile.get('industry')
    }); 

    controller.set('occupOne',{
      text: profile.get('occupationOne')
    });

    controller.set('occupTwo',{
      text: profile.get('occupationTwo')
    });
    controller.set('locations', models.locations);
  },

	actions: {

    selectionChanged: function(id, code, text) {
      console.log('<< typeahead component <<<', id, code, text);
      
      let keyText = id;
      let keyId = id +'Id';

      let profile = this.controller.get('profile');

      profile.set(keyText,text);
      profile.set(keyId,code);

      profile.save().then(()=>{
        console.log('typehead saved');
      });
    }
  }
});
