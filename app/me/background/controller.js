import Ember from 'ember';
import ProfileMixin from 'web/mixins/profile';

export default Ember.Controller.extend(ProfileMixin, {
	session: Ember.inject.service(),
  ajax: Ember.inject.service(),
  sharePost: Ember.inject.service(),
  isOwner: true,
  actions: {
    postFeed: function (data, cb) {
      this.store.createRecord('post', {
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
        this.store.findRecord('vote', res.get('id')).then(vote=>{
          res.set('vote', vote);
        });

        var post = this.store.peekRecord('newsfeed', res.get('sharedPostid'));
        post.set('vote.sharedCount', res.get('shareCount'))

        cb();
      });
    }

  }
});
