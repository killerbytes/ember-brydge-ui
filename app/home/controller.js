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
      console.log(data)
      // return false;
      this.store.createRecord('post', {
        site: data.site,
        preview: data.preview,
        content: data.postContent,
        categories: data.categories
      }).save().then((res) => {
        var newsfeed = this.get('newsfeed.live');
        newsfeed.pushObject(res._internalModel);
        cb.apply();
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
