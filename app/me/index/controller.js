import Ember from 'ember';

export default Ember.Controller.extend({
	session: Ember.inject.service(),
  flashMessages: Ember.inject.service(),
  sharePost: Ember.inject.service(),	
	sortProps: ['createdAt:desc'],
  newsfeed: Ember.computed.sort('model.posts', 'sortProps'),
  latestQuestion: Ember.computed('model.questions', function(){
    return this.get('model.questions.firstObject');
  }),
  isOwner: true,

  // isCurrentUser: Ember.computed('', function(){
  //   let userid = this.get('session.data.authenticated.user_id');

  // 	return this.get('model.profile.id') == userid ? true : false;
  // }),

  latestCompliment: Ember.computed('model.compliments', function () {
    return this.get('model.compliments.firstObject');
  }),
  actions: {
    sharePost(cb){
      this.get('sharePost').submit().then((res)=>{
        cb();
        Ember.get(this, 'flashMessages').success('Post Shared!');     
      });
    }  	
  }
});
