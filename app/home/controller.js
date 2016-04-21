import Ember from 'ember';

export default Ember.Controller.extend({
  
  selection: {
    id: 'myconnections',
    text: 'My Connections'
  },
  sortProps: ['createdAt:desc'],
  newsfeed: Ember.computed.sort('model.newsfeed', 'sortProps'),

  selectionChanged: function () {
    this.send('setCategory',this.get('selection.id'));
  }.observes('selection'),

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
