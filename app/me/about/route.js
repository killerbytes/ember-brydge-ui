import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  model() {
    let userid = this.get('session.data.authenticated.user_id');
    // let userid = '3ze5n8glm6b'
    // return this.store.findRecord('profile', userid, {reload: true});
    this.store.unloadAll('language');
    this.store.unloadAll('experience');
    this.store.unloadAll('education');

    return Ember.RSVP.hash({
      profile: this.store.findRecord('profile', userid, {reload: true}),
      // posts: this.store.query('newsfeed', {filter: userid, tab: 'profile'}),
      languages: this.store.findAll('language'),
      experiences: this.store.findAll('experience'),
      educations: this.store.findAll('education'),
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