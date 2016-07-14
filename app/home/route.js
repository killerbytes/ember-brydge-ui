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
    return Ember.RSVP.hash({
      profile: this.store.findRecord('profile', ownerid),
      categories: $.getJSON('data/categories.json'),
      favorites: this.store.findAll('favoriteindustry')
    });
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
    var params = {};
    if(this.controller.tab) params.tab = tab;
    if(this.controller.channels) params.channels = this.controller.channels;
    if(this.controller.location) params.location = this.controller.location;
    if(this.controller.q) params.q = this.controller.q;
    this.store.query('newsfeed', params).then(res=>{
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

        Ember.$(window).on('scroll', function(){
          var $win = $(window);
          var $doc = $(document);
          var winHeight = $win.height();
          var docHeight = $doc.height();
          var scrollTop = $doc.scrollTop();
          if(docHeight - winHeight == scrollTop){
            console.log('should load newsfeed')
          }
        })

      })
    },
    setChannel(id){
      if(id == 0){
        this.controller.set('channels', null)
      }else{
        this.controller.set('channels', id)
      }
      this.loadNewsfeed();
    },
    setLocation(location){
      if(location == "Everywhere"){
        this.controller.set('location', null)
      }else{        
        this.controller.set('location', location);
      }
      this.loadNewsfeed();
    },


    // setLocation: function(location, cb) {
    //   this.controller.set('location', location);
    //   cb.apply();
    //   this.loadNewsfeed();
    // },

    // setChannel: function(geo, cb) {
    //   if(geo == 0) geo = null;
    //   console.log(geo);
    //   return false;
    //   this.controller.set('channels', geo);
    //   cb.apply();
    //   this.loadNewsfeed()
    // },
    search: function () {
      this.controller.set('tab', 'search');
      this.controller.set('q', this.controller.get('searchContent'))
      this.loadNewsfeed();
    },
    onLocationSelect: function (item, cb) {
      this.set('controller.selectedCity', item);
    },
    clear(){
      this.controller.set('q', null)
      this.controller.set('searchContent', null)
    },
    onFavoriteIndustrySelect(items){
      this.get('controller.model.favorites').forEach(function(i){
        i.destroyRecord()
      })
      _.each(items, i=>{
        this.get('store').createRecord('favoriteindustry', {
          code: i.code,
          name: i.name,
          userid: this.get('session.data.authenticated.user_id')
        }).save();
      })
    },

  }
});
