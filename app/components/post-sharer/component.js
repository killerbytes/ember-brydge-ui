import Ember from 'ember';
import SharePostIndustryPicker from 'web/mixins/share-post-industry-picker';

export default Ember.Component.extend(SharePostIndustryPicker, {
	sessionAccount: Ember.inject.service(),
	sharePost: Ember.inject.service(),
	title: Ember.computed('post.title', function(){
		let title = this.get('post.title');
		if(!title) return false;
		return title.length > 100 ? title.substr(0, 100) + ' ...' : title;
	}),
  elem: Ember.computed(function(){
    return $('#sharePostModal');
  }),
	profile: Ember.computed('sessionAccount.account.profile', function(){
		return this.get('sessionAccount.account.profile');
	}),
	sharedTitle: Ember.computed('post.sharedPost.title', function(){
		let title = this.get('post.sharedPost.title');
		if(!title) return false;
		return title.length > 100 ? title.substr(0, 100) + ' ...' : title;
	}),
  isOccupational: Ember.computed('profile.industryTwoId', function(){
    return this.get('profile.industryTwoId') ? true : false && this.get('profile.industryThreeId') ? true : false;
  }),
	actions: {
		edit(text, e){
      var el = e.currentTarget;
      var offset = (el.offsetHeight - el.clientHeight);
      if(text){
        el.style.height = 'auto';
        el.style.height = (el.scrollHeight+offset) + "px";        
      }else{
        el.style.height = '';        
      }

		}
	}
});
