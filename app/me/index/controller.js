import Ember from 'ember';
import ProfileMixin from 'web/mixins/profile';
import IndustryMixin from 'web/mixins/industry';

export default Ember.Controller.extend(
	IndustryMixin,
	ProfileMixin, {
	session: Ember.inject.service(),
  ajax: Ember.inject.service(),
  sharePost: Ember.inject.service(),
  isOwner: true,
  actions: {
    post: function (data, cb) {
      this.store.createRecord('newsfeed', {
        site: data.site,
        preview: data.preview,
        content: data.content,
        categories: data.categories
      }).save().then((res) => {
        var newsfeed = this.get('posts');
        newsfeed.pushObject(res._internalModel);
        cb.apply();
      }).catch((err) => {
      });
    },
    share(data, cb){
			this.set('sharePost.valueText', data.content );
			this.set('sharePost.categories', data.categories );
      this.get('sharePost').submit().then((res)=>{
        var newsfeed = this.get('posts');
        newsfeed.pushObject(res._internalModel);
        cb.apply();
      });
    },

  }
});
