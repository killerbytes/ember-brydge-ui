import Ember from 'ember';
import SharePostIndustryPicker from 'web/mixins/industry';

export default Ember.Component.extend(SharePostIndustryPicker, {
	sessionAccount: Ember.inject.service(),
	sharePost: Ember.inject.service(),
	willDestroyElement(){
		$('#sharePostModal').parent().remove();
	},
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
	sharedTitle: Ember.computed('post.shared.title', function(){
		let title = this.get('post.shared.title');
		if(!title) return false;
		return title.length > 100 ? title.substr(0, 100) + ' ...' : title;
	}),
  isIndustry: Ember.computed.or('profile.industryOneId', 'profile.industryTwoId', 'profile.industryThreeId'),
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
