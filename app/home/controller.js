import Ember from 'ember';
import QueryLocationMixin from 'web/mixins/query-locations';

export default Ember.Controller.extend(QueryLocationMixin,{
  
  sortProps: ['createdAt:desc'],
  newsfeed: Ember.computed.sort('model.newsfeed', 'sortProps'),
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
    }
  }
});
