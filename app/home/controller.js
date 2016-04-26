import Ember from 'ember';
import QueryLocationMixin from 'web/mixins/query-locations';

export default Ember.Controller.extend(QueryLocationMixin,{
  sharePost: Ember.inject.service(),
  sortProps: ['createdAt:desc'],
  newsfeed: Ember.computed.sort('model.newsfeed', 'sortProps'),
  
  queryParams: {
    tab: {
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
    sharePost: function(){
      // console.log('sharePost', this.get('sharePost.selected.id'), this.get('postContent'));
      this.store.createRecord('post', {
        content: this.get('postContent'),
        categories: [],
        sharedPostid: this.get('sharePost.selected.id')
      }).save().then((res) => {
        console.log(res)
        var newsfeed = this.get('model.newsfeed');
        newsfeed.pushObject(res._internalModel)

      }).catch((err) => {
        console.log("Error posting to newsfeed:", err);
      });
    }

  }
});
