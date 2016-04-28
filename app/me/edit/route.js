import Ember from 'ember';

export default Ember.Route.extend({
	model: function (params) {
		this.profileid = params.profile_id;

		return Ember.RSVP.hash({
	    educations: this.store.findAll('education'),
	    experiences: this.store.findAll('experience'),
	    profile: this.store.peekRecord('profile', params.profile_id),
      languages: this.store.findAll('language'),
      interests: this.store.findAll('interest')
	  });
	},

  setupController: function(controller, model) {
    var profile = model.profile;
    controller.setProperties(model);
    
    controller.set('selectedIndustry',{
      id: profile.get('industryId'),
      text: profile.get('industry')
    }); 

    controller.set('selectedOccupOne',{
      id: profile.get('occupationOneId'),
      text: profile.get('occupationOne')
    });

    controller.set('selectedOccupTwo',{
      id: profile.get('occupationTwoId'),
      text: profile.get('occupationTwo')
    });
    
    controller.set('selectedLoc', {
      text: profile.get('location')
    });
  },

	actions: {
    didTransition: function(){
      Ember.run.later(function(){
        Ember.$('.profile .tabs:first').on('change.zf.tabs', function(){
          console.log('change.zf.tabs')
        })

      })
    },

    citySelected: function (item) {
      console.log('citySelected (route) =>', item.city, item.state, item.country);

       var filtered ={
        id : item.state + '_' + item.city + '_' + item.country,
        text: item.state + ',' + item.city + ',' + item.country
       };

      this.controller.set('selectedLoc',filtered);
      let profile = this.controller.get('profile');
      profile.set('location',filtered.text);
    },

    industrySelected: function (item) {
      console.log('industrySelected (route) =>', item);

       var filtered ={
        id : item.id,
        text: item.text
       };

      this.controller.set('selectedIndustry', filtered);
      let profile = this.controller.get('profile');
      profile.set('industryId',filtered.id);
      profile.set('industry',filtered.text);
    },

    occupOneSelected: function (item) {
      console.log('occupOneSelected (route) =>', item);

       var filtered ={
        id : item.id,
        text: item.text
       };

      this.controller.set('selectedOccupOne', filtered);
      let profile = this.controller.get('profile');
      profile.set('occupationOneId',filtered.id);
      profile.set('occupationOne',filtered.text);
    },

    occupTwoSelected: function (item) {
      console.log('occupTwoSelected (route) =>', item);

       var filtered ={
        id : item.id,
        text: item.text
       };

      this.controller.set('selectedOccupTwo', filtered);
      let profile = this.controller.get('profile');
      profile.set('occupationTwoId',filtered.id);
      profile.set('occupationTwo',filtered.text);
    }
  }
});
