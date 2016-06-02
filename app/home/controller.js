import Ember from 'ember';
import QueryLocationMixin from 'web/mixins/query-locations';
import GetIndustryFromCodeMixin from 'web/mixins/get-industry-from-code';

export default Ember.Controller.extend(
  QueryLocationMixin, 
  GetIndustryFromCodeMixin, {
  flashMessages: Ember.inject.service(),
  ajax: Ember.inject.service(),
  sharePost: Ember.inject.service(),
  sortProps: ['createdAt:desc'],
  isSearch: Ember.computed('tab', function(){
    return this.get('tab') == 'search' ? true: false;
  }),
  profile: Ember.computed.alias('model.profile'),
  filteredLoc: Ember.computed('location', function(){
    return this.get('location') || 'Everywhere' ;
  }),
  filteredIndustry: Ember.computed('channels', function(){
    return this.getIndustryName(this.get('model.profile'), this.get('channels') || 0);
  }),
  feed_live: Ember.computed.sort('newsfeed.live', 'sortProps'),
  feed_curated: Ember.computed.sort('newsfeed.curated', 'sortProps'),
  feed_search: Ember.computed.sort('newsfeed.search', 'sortProps'),
  searchContent: Ember.computed('q', function(){
    return this.get('q') || null;
  }),
  queryParams: ['tab', 'channels', 'q', 'location'],
  tab: 'curated',
  channels: null,
  location: null,
  q: null,
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

  
  // queryParams: {
  //   tab: {
  //     refreshModel: true
  //   },
  //   q: {
  //     refreshModel: true
  //   },
  //   channels: {
  //     refreshModel: true
  //   },
  //   location: {
  //     refreshModel: true
  //   }
  // },

  // isSearch: false,

  actions: {
    postFeed: function (data, cb) {

      this.store.createRecord('post', {
        site: data.site,
        preview: data.preview,
        content: data.postContent,
        categories: data.categories
      }).save().then((res) => {
        if(this.get('tab') == 'live'){
          var newsfeed = this.get('newsfeed.live');
          newsfeed.pushObject(res._internalModel);
          cb.apply();
          Ember.get(this, 'flashMessages').success('Post Successful!');     

        }else{
          this.set('tab', 'live');
          this.loadNewsfeed('live', ()=>{
            cb.apply();
            Ember.get(this, 'flashMessages').success('Post Successful!');     
          })
        }
      }).catch((err) => {
        console.log("Error posting to newsfeed:", err);
      });
    },
    sharePost(cb){
      this.get('sharePost').submit().then(res =>{
        var newsfeed = this.get('newsfeed.live');
        newsfeed.pushObject(res._internalModel);
        Ember.get(this, 'flashMessages').success('Post Shared!');    
        this.store.findRecord('vote', res.get('sharedPostid'), {reload: true})
        cb.apply();
      });
    }

  }
});
