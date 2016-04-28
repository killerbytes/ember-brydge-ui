import Ember from 'ember';
import QueryLocationMixin from 'web/mixins/query-locations';

export default Ember.Controller.extend(QueryLocationMixin,{
  flashMessages: Ember.inject.service(),
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

  actions: {
    
    postFeed: function (content, categories) {
      // console.log('<<< post feed from (Home => Controller)',
      //   content,categories);
      this.store.createRecord('post', {
        content: content,
        categories: categories
      }).save().then((res) => {
        var newsfeed = this.get('model.newsfeed');
        newsfeed.pushObject(res._internalModel)

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
      this.get('sharePost').submit().then((res)=>{
        var newsfeed = this.get('model.newsfeed');
        newsfeed.pushObject(res._internalModel);
        Ember.get(this, 'flashMessages').success('Post Shared!');     
        cb();
      });
    }

  }
});
