import Ember from 'ember';
import SharePostIndustryPicker from 'web/mixins/industry';
import _ from 'lodash/lodash';

export default Ember.Component.extend(SharePostIndustryPicker, {
	sessionAccount: Ember.inject.service(),
	sharePost: Ember.inject.service(),
	willDestroyElement(){
		this.get('elem').parent().remove();
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
		share() {
      let content = this.get('postContent');

			if(!content){
				$(`#dialog-box-post-sharer-${this.get('profile.id')}`).foundation('open');
        return false;
      }

			let data = {
        content: content && content.trim(),
        categories: _.map(this.get('categories'), 'id'),
      }

      this.sendAction('submit', data, ()=>{
        this.get('elem').foundation('close');
        this._resetForm();
      })
      Ember.run.later(()=>{
        this.get('elem').find('textarea').get(0).style.height = '';
      })
    },
		edit(text, e){
      var el = e.currentTarget;
      var offset = (el.offsetHeight - el.clientHeight);
      if(text){
        el.style.height = 'auto';
        el.style.height = (el.scrollHeight+offset) + "px";
      }else{
        el.style.height = '';
      }
		},
		callback(){
			this.get('elem').foundation('open');

		}
	}
});
