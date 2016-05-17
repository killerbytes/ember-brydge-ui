import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  model() {
    let userid = this.get('session.data.authenticated.user_id');
    return this.store.findRecord('profile', userid, {reload: true});
  },
  setupController(controller, model){
  	let userid = model.id;
    this._super(...arguments);
    Ember.RSVP.hash({
      me: model,
      posts: this.store.query('newsfeed',{filter: userid, tab: 'profile'}),
      languages: this.store.findAll('language'),
      interests: this.store.findAll('interest'),
      experiences: this.store.query('experience',{userid: userid}),
      educations: this.store.query('education',{userid: userid}),
      questions: this.store.query('ask',{userid: userid}).then((asks)=>{
        return asks.filterBy('answer');
      }),
      compliments: this.store.query('compliment',{to: userid})    	
    }).then((res)=>{
	    controller.setProperties(res);
    })

  },
});
