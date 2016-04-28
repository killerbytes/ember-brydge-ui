import Ember from 'ember';

export default Ember.Route.extend({
  model(params) {
    const userid = params.user_id;
    const newsfeedid = params.newsfeed_id;
    return this.store.find('newsfeed', newsfeedid);
  }
});
