import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  model() {
    let userid = this.get('session.data.authenticated.user_id');
    // return this.store.findRecord('profile', userid, {reload: true});
    return Ember.RSVP.hash({
      profile: this.store.findRecord('profile', userid, {reload: true}),
      posts: this.store.query('newsfeed', {filter: userid, tab: 'profile'}),
      languages: this.store.query('language', {userid: userid}),
      interests: this.store.query('interest', {userid: userid}),
      experiences: this.store.query('experience', {userid: userid}),
      educations: this.store.query('education', {userid: userid}),
      questions: this.store.query('ask', {userid: userid}),
      compliments: this.store.query('compliment', {to: userid})      
    })

  },
  xxxsetupController(controller, model){
  	let userid = model.id;
    this.controller.set('isLoading', true);
    this._super(...arguments);
    Ember.RSVP.hash({
      me: model,
      posts: this.store.query('newsfeed',{filter: userid, tab: 'profile'}),
      languages: this.store.query('language', {userid: userid}),
      interests: this.store.findAll('interest'),
      experiences: this.store.query('experience',{userid: userid}),
      educations: this.store.query('education',{userid: userid}),
      questions: this.store.query('ask',{userid: userid}),
      compliments: this.store.query('compliment',{to: userid})    	
    }).then((res)=>{
	    controller.setProperties(res);
      this.controller.set('isLoading', false);

    })

  },
});
