import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import ENV from 'web/config/environment';
import FilterDropdownListMixin from 'web/mixins/filter-dropdown-list';




export default Ember.Route.extend(AuthenticatedRouteMixin, FilterDropdownListMixin, {
  session: Ember.inject.service('session'),

  categoryid: '',


  beforeModel(transition, params) {
    this._super(transition, params);
    return this.get('sessionAccount.account');
  },

  model() {
    console.log('<<<<<<<< categoryid', this.get('categoryid'));
    let ownerid = this.get('session.data.authenticated.user_id');
    return Ember.RSVP.hash({
      newsfeed: this.store.query('newsfeed', {categoryid:this.get('categoryid')}),
      profile: this.store.findRecord('profile', ownerid)
    });
  },

  actions: {

    setCategory: function(categoryid) {
      console.log('<<<< send action from controller', categoryid)
      this.set('categoryid',categoryid);
      this.refresh();
    },

    logout: function(){
      console.log('home/logout>>>')

      var accessToken = this.get('session.data.authenticated.access_token');
      Ember.$.getJSON(ENV['ember-simple-auth'].authorizerHost + "/expire?token=" + accessToken).done(()=> {
        this.get('session').invalidate();
        console.log("Expired session", accessToken);
      });
    },

    error: function(err, transition) {
      console.log(">>>home:route:error:", err);
      console.log(">>>home:route:error -->", err.status);
      console.log(err, transition);
      return true;
    }
  }
});
