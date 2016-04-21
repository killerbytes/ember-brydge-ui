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
    
    controller.set('industry',{
      text: profile.get('industry')
    }); 

    controller.set('occupOne',{
      text: profile.get('occupationOne')
    });

    controller.set('occupTwo',{
      text: profile.get('occupationTwo')
    });
    
    controller.set('selectedLoc', profile.get('location'));
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
