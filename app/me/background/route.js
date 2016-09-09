import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  model() {
    let userid = this.get('session.data.authenticated.user_id');
    this.store.unloadAll('language');
    this.store.unloadAll('experience');
    this.store.unloadAll('education');

    return Ember.RSVP.hash({
      profile: this.modelFor('me').profile,
      invites: this.modelFor('me').invites,
      questions: this.modelFor('me').questions,
      compliments: this.modelFor('me').compliments,

      // profile: this.store.findRecord('profile', userid),
      languages: this.store.findAll('language'),
      experiences: this.store.findAll('experience'),
      educations: this.store.findAll('education'),
      // questions: this.store.query('ask', {userid: userid}),
      // compliments: this.store.query('compliment', {to: userid})
    });

  },
  // renderTemplate(){
  //   this._super();
  //   Ember.run.later(()=>{
  //     if(!this.get('currentModel.profile.profileComplete.completeness')) $('#dd-info-callout').foundation('open');
  //   })
  // }
});
