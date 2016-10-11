import Ember from 'ember';
import QueryLocationMixin from 'web/mixins/query-locations';
import GetIndustryFromCodeMixin from 'web/mixins/get-industry-from-code';
import InviteMixin from 'web/mixins/invite';
import _ from 'lodash/lodash';

const {
  Component,
  computed,
  getOwner
} = Ember;

export default Ember.Controller.extend(
  QueryLocationMixin,
  GetIndustryFromCodeMixin,
  InviteMixin, {
  session: Ember.inject.service(),
  ajax: Ember.inject.service(),
  utils: Ember.inject.service(),
  sharePost: Ember.inject.service(),
  industryPicker: Ember.inject.service(),
  sortProps: ['updatedAt:desc'],
  isSearch: Ember.computed('tab', function(){
    return this.get('tab') == 'search' ? true: false;
  }),
  profile: Ember.computed.alias('model.profile'),
  filteredLoc: Ember.computed('location', function(){
    return this.get('location') || 'All Cities' ;
  }),
  filteredIndustry: Ember.computed('channels', function(){
    return this.getIndustryName(this.get('model.profile'), this.get('channels') || 0);
  }),
  myfavs: Ember.computed.map('model.favorites', function(i){
    return {
      code: i.get('code'),
      name: i.get('name')
    };
  }),
  favorites: Ember.computed.alias('model.favorites'),
  industries: Ember.computed.alias('model.industries'),
  favoriteIndustries: Ember.computed('favorites', function(){
    return _.map(this.get('favorites').toArray(), i=>{
      // console.log( i)
      return i.get('code');
    })
  }),

  googlePlaceObject: Ember.computed('location', function(){
    return this.get('location') ? this.get('utils').googlePlace(this.get('location')) : false;
  }),
  newsfeed_live: Ember.computed('newsfeed.live.length', function(){
    return this.get('newsfeed.live');
  }),
  feed_live: Ember.computed.sort('newsfeed_live', 'sortProps'),
  searchContent: Ember.computed('q', function(){
    return this.get('q') || null;
  }),
  queryParams: ['tab', 'channels', 'q', 'location'],
  tab: 'curated',
  channels: null,
  location: null,
  q: null,
  init(){
    const email = this.get('session.data.authenticated.email') || nil;
    if (email) {
      window.doorbellOptions.email = email;
      window.doorbellOptions.hideEmail = true;
    }

  },
  loadNewsfeed(tab, cb){
    var tab = tab ||  this.tab;
    this.set('newsfeed', {});
    // this.set('newsfeed', {live: [], curated: [], search: []});
    this.set('isLoading', true);
    // return false;
    if(this.tab != 'search'){
      this.setProperties({
        q: null,
        searchContent: null
      });
    }else{
      if(!this.get('q')){
        this.set('tab', 'curated');
        tab = 'curated';
      }
    }
    var params = {};
    if(this.tab) params.tab = tab;
    if(this.channels) params.channels = this.channels;
    if(this.location) params.location = this.location;
    if(this.q) params.q = this.q;
    this.store.query('newsfeed', params).then(res=>{
      // this.set('newsfeed', {live: [], curated: [], search: []});
      this.set('newsfeed.'+ tab, res);
      this.set('isLoading', false)
      cb.apply();
    })
  },
  _saveFavorites(items){
    var promises = [];

    items.forEach(i=>{
      promises.push(this.get('store').createRecord('favoriteindustry', {
        code: i.get('industryId'),
        // name: i.get('industry'),
        // userid: this.get('session.data.authenticated.user_id')
      }).save());
    })
    Ember.RSVP.all(promises).then(()=>{
      this.set('isFavoritesLoading', false);
    });
  },
  actions: {
    post: function (data, cb) {
      this.store.createRecord('newsfeed', {
        site: data.site,
        preview: data.preview,
        content: data.content,
        categories: data.categories
      }).save().then((res) => {
        if(this.get('tab') == 'live'){
          var newsfeed = this.get('newsfeed.live');
          newsfeed.pushObject(res._internalModel);
          cb.apply();
        }
        // }else{
        //   this.set('tab', 'live');
        //   this.loadNewsfeed('live', ()=>{
            // cb.apply();
        //   })
        // }
      }).catch((err) => {
      });
    },
    share(data, cb){
      this.set('sharePost.valueText', data.content );
			this.set('sharePost.categories', data.categories );
      this.get('sharePost').submit().then(res =>{
        if(this.get('tab') == 'live'){
          var newsfeed = this.get('newsfeed.live');
          newsfeed.pushObject(res._internalModel);
          cb.apply();
        }
        // }else{
        //   this.set('tab', 'live');
        //   cb.apply();
        //   this.loadNewsfeed('live')
        // }
      });
    },
    onFavoriteIndustrySelect(items){
      this.set('isFavoritesLoading', true);
      var promises = [];
      this.get('favorites').forEach(i=>{
        promises.push(i.destroyRecord());
      })

      Ember.RSVP.all(promises).then(res=>{
        this._saveFavorites(items);
      })
    }
  }
});
