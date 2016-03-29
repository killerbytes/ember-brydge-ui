import Ember from 'ember';

export default Ember.Controller.extend({
  
  isCheckedIndustry: false,
  isCheckedOccupationOne: true,
  isCheckedOccupationTwo: false,

  actions: {
   
    postFeed: function (content, categories) {
      console.log('<<< post feed from (Home => Controller)',
        content,categories);

      // 
      // save the post
      //
      this.store.createRecord('post', {
        content: content,
        categories: categories
      }).save().
      then((res) => {
        //
        // refresh the router
        //
        this.get('target.router').refresh();

      }).catch((err) => {
        console.log("Error posting to newsfeed:", err);
      });
    }
  }
});
