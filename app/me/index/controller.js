import Ember from 'ember';
import ProfileMixin from 'web/mixins/profile';

export default Ember.Controller.extend(ProfileMixin, {
	session: Ember.inject.service(),
  ajax: Ember.inject.service(),
  sharePost: Ember.inject.service(),
  isOwner: true,
  actions: {
    postFeed: function (data, cb) {
      this.store.createRecord('newsfeed', {
        site: data.site,
        preview: data.preview,
        content: data.postContent,
        categories: data.categories
      }).save().then((res) => {
        var newsfeed = this.get('posts');
        newsfeed.pushObject(res._internalModel);
        cb.apply();
      }).catch((err) => {
      });
    },
    sharePost(cb){
      this.get('sharePost').submit().then((res)=>{
        var newsfeed = this.get('posts');
        newsfeed.pushObject(res._internalModel);
        cb.apply();
      });
    },

  }
});
