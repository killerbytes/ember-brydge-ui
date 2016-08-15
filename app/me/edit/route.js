import Ember from 'ember';
import QueryLocationMixin from 'web/mixins/query-locations';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';


export default Ember.Route.extend(
  AuthenticatedRouteMixin,
  QueryLocationMixin, {
  session: Ember.inject.service(),
  utils: Ember.inject.service(),

  resetController(controller, isExiting, transition) {
      if (isExiting) {
        controller.setProperties({
          tab: 'personal',
        });
      }
  },
	model: function (params) {
    var userid = this.get('session.data.authenticated.user_id');

		return Ember.RSVP.hash({
      profile: this.store.findRecord('profile', userid, {reload: true}),
      categories: this.get('ajaxApi').request('/v2/categories/menu'),
      languages: this.store.findAll('language'),
      experiences: this.store.findAll('experience'),
      educations: this.store.findAll('education')
	  });
	},
  getCategory(value){
    var categories = this.get('currentModel.categories');
    return _.chain(_.map(categories, 'categories'))
               .flatten()
               .map((i)=>{ return i.industries; })
               .flatten()
               .filter((d)=>{ return d.data.code == value; })
               .first()
               .value().data.subIndustry;
  },

	actions: {
    save(item, cb){
      var profile = this.get('controller.profile');
      console.log(profile)
      profile.save().then(()=>{
        cb.apply()
      });
    },

    didTransition: function(){
      Ember.run.later(()=>{
        Ember.$('.brydge-tab .tabs:first').on('change.zf.tabs', (e, elem)=>{
          this.set('controller.tab', elem.data('tab'))
        })
      })
    },
    setBusinessIndustry(item){
      console.log(item);
      this.set('controller.profile.industryOneId', item.code);
      this.set('controller.profile.industryOneName', item.name );
    },
    setOccupationalOne(item){
      this.set('controller.profile.industryTwoId', item.code);
      this.set('controller.profile.industryTwoName', item.name);
    },
    setOccupationalTwo(item){
      this.set('controller.profile.industryThreeId', item.code);
      this.set('controller.profile.industryThreeName', item.name);
    },

    onLocationSelect(item){
      console.log(item)
      // let location = item.terms.join(', ');
      // this.controller.set('selectedLoc', location);
      // let profile = this.controller.get('profile');
      this.set('controller.profile.location', item);
    },
    industrySelected: function (item) {
      console.log('industrySelected (route) =>', item);

       var filtered ={
        id : item.id,
        text: item.text
       };

      this.controller.set('selectedIndustry', filtered);
      let profile = this.controller.get('profile');
      profile.set('industryOneId',filtered.id);
      profile.set('industryOneName',filtered.text);
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
    setSelected(item){
      this.controller.set('current', item);
    },
    onIndustrySelected(code){
      this.controller.set('_selected', {
        id: code,
        text: this.getCategory(code)
      })
    },
    onSelectDone(){
      var x = this.controller.get('current');
      this.controller.set('profile.'+x, this.controller.get('_selected.text'))
      this.controller.set('profile.'+x+'Id', this.controller.get('_selected.id'))
    },
    clear(type){
      var data;
      switch (type) {
        case 'industryOne':
          data = {
            industryOneId: null,
            industryOneName: null
          }
          break;
        case 'industryTwo':
          data = {
            industryTwoId: null,
            industryTwoName: null
          }
          break;
        case 'industryThree':
          data = {
            industryThreeId: null,
            industryThreeName: null
          }
      }
      this.get('controller.profile').setProperties(data)
    }


  }
});
