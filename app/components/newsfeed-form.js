import Ember from 'ember';

export default Ember.Component.extend({

  actions: {
    post() {
      console.log('Posting to newsfeed man', this.get('postContent'));
      this.sendAction('postToNewsfeed', this.get('postContent'));
    },
    cancel() {
      console.log("Cancel: clear the form", this.get('postContent'));
      this.set('postContent', '');
    }
  }
});
