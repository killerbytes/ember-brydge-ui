import Ember from 'ember';

export default Ember.Route.extend({
  model(params) {
   console.log("routes/post.js>>>>>>", params, this);
    const userid = params.user_id;
    const newsfeedid = params.newsfeed_id;
    return this.store.find('newsfeed', newsfeedid);
  }
});
