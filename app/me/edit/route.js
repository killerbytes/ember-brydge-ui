import Ember from 'ember';
import QueryLocationMixin from 'web/mixins/query-locations';

export default Ember.Route.extend(QueryLocationMixin, {
  flashMessages: Ember.inject.service(),
	model: function (params) {
		this.profileid = params.profile_id;

    this.store.unloadAll();
		return Ember.RSVP.hash({
	    educations: this.store.findAll('education',{reload: true}),
	    experiences: this.store.findAll('experience',{reload: true}),
	    profile: this.store.findRecord('profile', params.profile_id, {reload: true}),
      languages: this.store.findAll('language',{reload: true}),
      interests: this.store.findAll('interest',{reload: true})
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
      Ember.run.later(()=>{
        Ember.$('.profile .tabs:first').on('change.zf.tabs', (e, elem)=>{
          this.set('controller.tab', elem.data('tab'))
        })
      })
    },
    citySelected(item){
      this.controller.set('selectedLoc', item);
      let profile = this.controller.get('profile');
      profile.set('location', item.text);      
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
    },
    createWork(component, cb){
      let data = component.getProperties("company", "title", "location", "content", "from", "to", "currentCompany");
      let work = this.store.createRecord('experience', data);

      work.save().then(() => {
        Ember.get(this, 'flashMessages').success('Success!');
        component.setProperties({
          company: null,
          title: null,
          location: null,
          content: null,
          from: null,
          to: null,
          currentCompany: null
        });
        cb.apply();
      })
    },
    updateWork(item, cb){
      item.save().then(()=>{
        Ember.get(this, 'flashMessages').success('Success!');
        cb.apply();
      });
    },
  }
});
