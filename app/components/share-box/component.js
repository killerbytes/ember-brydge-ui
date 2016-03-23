import Ember from 'ember';

export default Ember.Component.extend({
	classNames: ['share-box'],
	actions: {
    post() {
      console.log('<<< post feed from (Home => Component)', this.get('postContent'));
      this.sendAction('postFeed', this.get('postContent'));
    },
    cancel() {
      console.log("Cancel: clear the form", this.get('postContent'));
      this.set('postContent', '');
    }
  }
});
