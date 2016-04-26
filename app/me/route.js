import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import GeoChannelFilterMixin from 'web/mixins/geo-channel-filter';

export default Ember.Route.extend(AuthenticatedRouteMixin,{
  session: Ember.inject.service('session'),
  notification: Ember.inject.service(),
  beforeModel(transition, params) {
    this._super(transition, params);
    return this.get('sessionAccount.account'); // needed to make sure sessionAccount is full realized
  },

  model() {
    let userid = this.get('session.data.authenticated.user_id');
    this.get('notification').requestConnections();

    return Ember.RSVP.hash({
      account: this.store.findRecord('user', userid),
      posts: this.store.findAll('post', userid),
      profile: this.store.findRecord('profile', userid),
      languages: this.store.findAll('language'),
      interests: this.store.findAll('interest'),
      experiences: this.store.query('experience',{userid: userid}),
      educations: this.store.query('education',{userid: userid}),
      lastestQuestion: this.store.query('ask',{userid: userid}).then((asks)=>{
        return asks.filterBy('answer').get('firstObject');
      })
    });
  }

});
