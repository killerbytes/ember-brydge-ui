import Ember from 'ember';

export default Ember.Controller.extend({
	session: Ember.inject.service(),
  flashMessages: Ember.inject.service(),
  sharePost: Ember.inject.service(),	
	sortProps: ['createdAt:desc'],
  posts: Ember.computed.sort('model.posts', 'sortProps'),
  latestQuestion: Ember.computed('model.questions', function(){
    return this.get('model.questions.firstObject');
  }),

  isCurrentUser: Ember.computed('', function(){
    let userid = this.get('session.data.authenticated.user_id');

  	return this.get('model.profile.id') == userid ? true : false;
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
