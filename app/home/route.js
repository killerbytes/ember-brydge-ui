import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import ENV from 'web/config/environment';
import FilterDropdownListMixin from 'web/mixins/filter-dropdown-list';

export default Ember.Route.extend(AuthenticatedRouteMixin, FilterDropdownListMixin, {
  session: Ember.inject.service('session'),
  categoryid: '',
  geoChannels: '',

  beforeModel(transition, params) {
    this._super(transition, params);
    return this.get('sessionAccount.account');
  },

  model: function (params) {
    let ownerid = this.get('session.data.authenticated.user_id');
    console.log('params =>', params);
    if(!params.tab) {
      console.log('no tab');
      params.tab='curated';
    }
    
    return Ember.RSVP.hash({
      newsfeed: this.store.query('newsfeed',params),
      profile: this.store.findRecord('profile', ownerid)
    });
  },

  actions: {

    setLocation: function(location) {
      console.log('location =>', location);
      this.transitionTo('home', { queryParams: { location: location }});
      this.refresh();
    },

    setChannel: function(geo) {
      console.log('<< geo', geo);
      this.transitionTo('home', { queryParams: { channels: geo }});
      this.refresh();
    },

    showMoreFields: function(tab) {
      console.log('<<< tab', tab);
      if(tab === 'curated') {
        console.log('<<< curated');
        this.controller.set('isCurated',true);
      }else{
        console.log('<<< live');
        this.controller.set('isCurated',false);
      }
      
      this.transitionTo('home', { queryParams: { tab: tab }});
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
    },
    add: function(){
      this.store.push('post', {
        data: {"test": 1},
      })
    },

    citySelected: function (item) {
      console.log('select home(route) =>', item.city, item.state, item.country);

       var filtered ={
        id : item.state + ',' + item.city + ',' + item.country,
        text: item.state + ',' + item.city + ',' + item.country
       };
       this.controller.set('selectedLoc',filtered);
       //this.set('selectedLoc', filtered);
    }

  }
});
