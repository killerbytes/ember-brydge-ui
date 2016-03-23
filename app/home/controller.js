import Ember from 'ember';

export default Ember.Controller.extend({
  
  isCheckedIndustry: false,
  isCheckedOccupationOne: true,
  isCheckedOccupationTwo: false,

  actions: {
    postFeed: function (content) {
      console.log('<<< post feed from (Home => Controller)',
        content,
        this.get('isCheckedIndustry'), 
        this.get('isCheckedOccupationOne'),
        this.get('isCheckedOccupationTwo'));

      this.store.createRecord('post', {
        content: content
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
