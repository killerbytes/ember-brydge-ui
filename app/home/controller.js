import Ember from 'ember';
import QueryLocationMixin from 'web/mixins/query-locations';

export default Ember.Controller.extend(QueryLocationMixin,{
  flashMessages: Ember.inject.service(),
  ajax: Ember.inject.service(),
  sharePost: Ember.inject.service(),
  sortProps: ['createdAt:desc'],
  newsfeed: Ember.computed.sort('model.newsfeed', 'sortProps'),
  
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

  isSearch: false,

  actions: {
    postFeed: function (content, categories, site, cb) {
      this.store.createRecord('post', {
        content: content,
        categories: categories
      }).save().then((res) => {
        var newsfeed = this.get('model.newsfeed');
        newsfeed.pushObject(res._internalModel);
        cb.apply();
      }).catch((err) => {
        console.log("Error posting to newsfeed:", err);
      });
    },

    postComment: function (content, postId) {
      console.log('post comment =>', comment, postId);
    },
    setSelected: function (a,b){
      console.log('setSelected', a,b)
    },
    sharePost(cb){
      this.get('sharePost').submit().then(res =>{
        var sharedPost = this.store.findRecord('newsfeed', res.get('sharedPostid'));
        console.log(sharedPost, res)
        res._internalModel.sharedPost = sharedPost;
        var newsfeed = this.get('model.newsfeed');
        newsfeed.pushObject(res._internalModel);
        Ember.get(this, 'flashMessages').success('Post Shared!');    
        this.store.findRecord('vote', res.get('sharedPostid'), {reload: true})

        cb.apply();
      });
    }

  }
});
