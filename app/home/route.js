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

  model(params) {
    let ownerid = this.get('session.data.authenticated.user_id');
    // let query = '';
    
    // if(this.get('categoryid') && this.get('geoChannels')) {
    //   query = this.get('categoryid')+','+this.get('geoChannels');
    // }else if(this.get('categoryid')){
    //   query = this.get('categoryid');
    // }else if(this.get('geoChannels')){
    //   query = this.get('geoChannels');
    // }

    // console.log('<<< filtering =>', query);
    console.log('params =>', params);
    
    return Ember.RSVP.hash({
      newsfeed: this.store.query('newsfeed',params),
      profile: this.store.findRecord('profile', ownerid)
    });
  },

  actions: {

    setLocation: function(location) {
      // console.log('<<<< send action from controller', categoryid)
      // console.log('Geo filtering =>', this.get('geoChannels'))
      // this.set('categoryid',categoryid);
      // this.refresh();

      console.log('location =>', location);
      this.transitionTo('home', { queryParams: { location: location }});
      this.refresh();
    },

    setChannel: function(geo) {
      // console.log('<<< send action from controller', geo);
      // console.log('Category filtering =>', this.get('categoryid'))
      // this.set('geoChannels',geo);
      // this.refresh();
      
      console.log('<< geo', geo);
      this.transitionTo('home', { queryParams: { channels: geo }});
      this.refresh();
    },

    showMoreFields: function(tab) {
      console.log('<<< tab', tab);
      if(tab === 'isCurated') {
        this.controller.set('isCurated',true);
      }else {
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
