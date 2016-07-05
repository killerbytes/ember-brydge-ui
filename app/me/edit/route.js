import Ember from 'ember';
import QueryLocationMixin from 'web/mixins/query-locations';

export default Ember.Route.extend(QueryLocationMixin, {
  flashMessages: Ember.inject.service(),
  session: Ember.inject.service(),
	model: function (params) {
    var userid = this.get('session.data.authenticated.user_id');
    this.store.unloadAll('language');
    this.store.unloadAll('interest');
    this.store.unloadAll('experience');
    this.store.unloadAll('education');

		return Ember.RSVP.hash({
      categories: $.getJSON('data/categories.json'),
      profile: this.store.findRecord('profile', userid, {reload: true}),

      //languages: this.store.findAll('language', {userid: userid}),
      //interests: this.store.findAll('interest', {userid: userid}),
      experiences: this.store.findAll('experience', {userid: userid}),
      educations: this.store.findAll('education', {userid: userid}),


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
    didTransition: function(){
      Ember.run.later(()=>{
        Ember.$('.profile-tab .tabs:first').on('change.zf.tabs', (e, elem)=>{
          this.set('controller.tab', elem.data('tab'))
        })
      })
    },
    setBusinessIndustry(item){
      this.set('controller.profile.industryOneId', item.data.code);
      this.set('controller.profile.industryOneName', item.data.subIndustry);
    },
    setOccupationalOne(item){
      this.set('controller.profile.industryTwoId', item.data.code);
      this.set('controller.profile.industryTwoName', item.data.subIndustry);
    },
    setOccupationalTwo(item){
      this.set('controller.profile.industryThreeId', item.data.code);
      this.set('controller.profile.industryThreeName', item.data.subIndustry);
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
    }

  }
});
