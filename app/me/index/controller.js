import Ember from 'ember';
import ProfileMixin from 'web/mixins/profile';

export default Ember.Controller.extend(ProfileMixin, {
	session: Ember.inject.service(),
  ajax: Ember.inject.service(),
  flashMessages: Ember.inject.service(),
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
        Ember.get(this, 'flashMessages').success('Post Successful!');
      }).catch((err) => {
        console.log("Error posting to newsfeed:", err);
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
        Ember.get(this, 'flashMessages').success('Post Shared!');
      });
    },
    // fileLoaded: function(formData){
		// 	console.log('me')
    //   return this.get('ajax').request('/v2/profile/avatar', {
    //     method: 'POST',
    //     data: formData,
    //     contentType: false,
    //     processData: false,
    //   }).then((res)=>{
    //     console.log(res);
    //     this.get('model').set('avatarUrl',res.data.attributes.avatarUrl);
    //   })
    // }

  }
});
