import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  model() {
    let userid = this.get('session.data.authenticated.user_id');
    // let userid = '3ze5n8glm6b'
    // return this.store.findRecord('profile', userid, {reload: true});
    return Ember.RSVP.hash({
      profile: this.store.findRecord('profile', userid, {reload: true}),
      posts: this.store.query('newsfeed', {filter: userid, tab: 'profile'}),
      languages: [], // this.store.query('language', {userid: userid}),
      interests: [], //this.store.query('interest', {userid: userid}),
      experiences: [], //this.store.query('experience', {userid: userid}),
      educations: [], //this.store.query('education', {userid: userid}),
      questions: this.store.query('ask', {userid: userid}),
      compliments: this.store.query('compliment', {to: userid})      
    });

  },
  renderTemplate(){
    this._super();
    Ember.run.later(()=>{
      if(!this.get('currentModel.profile.profileComplete.completeness')) $('#dd-info-callout').foundation('open');
    })
  }
});
