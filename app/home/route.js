import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import ENV from 'web/config/environment';
import FilterDropdownListMixin from 'web/mixins/filter-dropdown-list';

export default Ember.Route.extend(AuthenticatedRouteMixin, FilterDropdownListMixin, {
  session: Ember.inject.service('session'),
  categoryid: '',
  geoChannels: '',
  isCurated: null,
  isLive: null,

  beforeModel(transition, params) {
    this._super(transition, params);
    return this.get('sessionAccount.account');
  },

  model: function (params) {
    let ownerid = this.get('session.data.authenticated.user_id');
    // if(params.q && params.q=='null') {
    //   delete params.q;
    // }

    // if(params.channels && params.channels=='myconnections') {
    //   delete params.channels;
    // }

    // if(!params.tab) {
    //   params.tab='curated';
    // }
    
    // this.store.unloadAll('newsfeed');

    return Ember.RSVP.hash({
      // newsfeed: this.store.query('newsfeed',params),
      profile: this.store.findRecord('profile', ownerid)
    });
  },
  setupController(){
    this._super(...arguments);
    this.controller.set('newsfeed', {});
  },
  loadNewsfeed(tab){
    var tab = tab ||  this.controller.tab;
    this.controller.set('newsfeed', {});
    // this.controller.set('newsfeed', {live: [], curated: [], search: []});
    this.controller.set('isLoading', true);
    // return false;
    if(this.controller.tab != 'search'){
      this.controller.setProperties({
        q: null,
        searchContent: null
      });
    }else{
      if(!this.controller.get('q')){
        this.controller.set('tab', 'curated');
        tab = 'curated';
      }
    }
    var params = {};
    if(this.controller.tab) params.tab = tab;
    if(this.controller.channels) params.channels = this.controller.channels;
    if(this.controller.location) params.location = this.controller.location;
    if(this.controller.q) params.q = this.controller.q;
    this.store.query('newsfeed', params).then(res=>{
      // this.controller.set('newsfeed', {live: [], curated: [], search: []});
      this.controller.set('newsfeed.'+ tab, res);
      this.controller.set('isLoading', false)
    })
  },
  actions: {
    didTransition: function(){
      this.loadNewsfeed()

      Ember.run.later(()=>{
        Ember.$('.newsfeed-tabs .tabs:first').on('change.zf.tabs', (e, elem)=>{
          if(!elem) return false;
          this.set('controller.tab', elem.data('tab'));
          this.loadNewsfeed(elem.data('tab'))
        })
      })
    },

    setLocation: function(location, cb) {
      if(location == 0) location = null;
      this.controller.set('location', location);
      cb.apply();
      this.loadNewsfeed();
    },

    setChannel: function(geo, cb) {
      if(geo == 0) geo = null;
      this.controller.set('channels', geo);
      cb.apply();
      this.loadNewsfeed()
    },
    search: function () {
      // console.log('pressed search', this.controller.get('searchContent'))
      // this.transitionTo('home', { queryParams: { q: this.controller.get('searchContent') }});
      // this.refresh();
      this.controller.set('tab', 'search');
      this.controller.set('q', this.controller.get('searchContent'))
      this.loadNewsfeed();
    },
    citySelected: function (item, cb) {
       var filtered ={
        id : item.text,
        text: item.text
       };
       cb.apply(this, [filtered]);
    },
    clear(){
      this.controller.set('q', null)
      this.controller.set('searchContent', null)
    }
/*
    showMoreFields: function(tab) {
      console.log('<<< tab', tab);
      if(tab === 'curated') {
        console.log('<<< curated');
        this.controller.set('isCurated',true);
        this.controller.set('isLive', false);
      }else{
        console.log('<<< live');
        this.controller.set('isCurated',false);
        this.controller.set('isLive',true);
      }

      this.controller.set('isSearch', false);
      this.controller.set('searchContent',null);
      this.store.query('newsfeed',{ tab: tab, q:null }, {reload: true}).then(res=>{
        this.set('currentModel.newsfeed', res)
        this.transitionTo('home', { queryParams: { tab: tab, q:null }});
      })

      // this.refresh();
    },
  */
/*
    focusedInSearch: function () {
      console.log('focus search')
      
      this.set('isCurated',this.controller.get('isCurated'));
      this.set('isLive',this.controller.get('isLive'));

      this.controller.set('isCurated',false);
      this.controller.set('isLive',false);
      this.controller.set('isSearch', true);

      this.transitionTo('home', { queryParams: { tab: 'search' }});
    },

    focusedOutSearch: function () {
      console.log('focus out')
      
      this.controller.set('isCurated',this.get('isCurated'));
      this.controller.set('isLive',this.get('isLive'));
      this.controller.set('isSearch', false);
      
      this.transitionTo('home', { queryParams: { tab: 'curated',q:null }});
    },
*/
/*
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

*/


  }
});
