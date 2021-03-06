import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import ENV from 'web/config/environment';
import FilterDropdownListMixin from 'web/mixins/filter-dropdown-list';
import ScrollResetMixin from 'web/mixins/scroll-reset';
import BrydgeScroller from 'web/mixins/brydge-scroller';
import _ from 'lodash/lodash';

// const {
//   Component,
//   computed,
//   getOwner
// } = Ember;

export default Ember.Route.extend(
  BrydgeScroller,
  ScrollResetMixin,
  AuthenticatedRouteMixin,
  // FilterDropdownListMixin,
  {
  session: Ember.inject.service(),
  ajax: Ember.inject.service(),
  ajaxApi: Ember.inject.service(),
  categoryid: '',
  geoChannels: '',
  isCurated: null,
  isLive: null,
  queryParams: {
    tab: {
      refreshModel: true
    },
    q: {
      refreshModel: true
    },
    channels: {
      refreshModel: true
    },
    location: {
      refreshModel: true
    }
  },
  resetController(controller, isExiting, transition) {
      if (isExiting) {
        controller.setProperties({
          tab: 'curated',
          channels: null,
          location: null,
          q: null
        });
      }
  },
  beforeModel(transition, params) {
    this._super(transition, params);
    return this.get('sessionAccount.account');
  },
  model: function (params) {
    let ownerid = this.get('session.data.authenticated.user_id');
    return Ember.RSVP.hash({
      profile: this.store.findRecord('profile', ownerid),
      // invites: this.store.findAll('friend-invitation'),
      // industries: this.get('ajaxApi').request('/v2/industries'),
      favorites: this.store.findAll('favoriteindustry')
    });
  },
  afterModel(model, transition){
    if(model && model.profile.get('configSetting.newProfile')) this.transitionTo('onboarding');
  },
  setupController(){
    this._super(...arguments);
    this.controller.set('newsfeed', {});
  },
  loadNewsfeed(tab){
    var tab = tab ||  this.controller.tab;
    this.controller.set('newsfeed', {});
    this.controller.set('isLoading', true);
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
    var params = {
      scroller: tab,
      per_page: 15,
      modelPath: 'controller.newsfeed.' + tab
    };
    if(this.controller.tab) params.tab = tab;
    if(this.controller.channels) params.channels = this.controller.channels;
    if(this.controller.location) params.location = this.controller.location;

    if(this.controller.q) params.q = this.controller.q;
    this.brydgeScroller('newsfeed', params).then(res=>{
      this.controller.set('newsfeed.'+ tab, res);
      this.controller.set('isLoading', false);
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
        });
      })
    },
    setChannel(id){
      if(id == 0){
        this.controller.set('channels', null)
      }else{
        this.controller.set('channels', id)
      }
      //this.loadNewsfeed();
    },
    setLocation(location){
      if(location == "All Cities"){
        this.controller.set('location', null)
      }else{
        this.controller.set('location', location.place_id);
      }
      //this.loadNewsfeed();
    },
    search: function () {
      this.controller.set('tab', 'search');
      this.controller.set('q', this.controller.get('searchContent'))
      //this.loadNewsfeed();
    },
    onLocationSelect: function (item, cb) {
      this.set('controller.selectedCity', item);
    },
    // clear(){
    //   this.controller.set('q', null)
    //   this.controller.set('searchContent', null)
    // },
    dismiss(){
      var configSetting = this.store.peekRecord('configSetting', this.get('controller.profile.id'));
      configSetting.set('key', 'show_guide');
      configSetting.set('value', false);
      configSetting.save();
    }
  }
});
