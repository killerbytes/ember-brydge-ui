import Ember from 'ember';
import SharePostIndustryPicker from 'web/mixins/industry';
import _ from 'lodash/lodash';

export default Ember.Component.extend(SharePostIndustryPicker, {
	sessionAccount: Ember.inject.service(),
	postAsNew: Ember.inject.service(),
	utils: Ember.inject.service(),
	item: Ember.computed.alias('postAsNew'),
	willDestroyElement(){
		$('#postAsNew').parent().remove();
	},
	elem: Ember.computed(function(){
    return $('#postAsNew');
  }),
	title: Ember.computed('post.title', function(){
		let title = this.get('post.title');
		if(!title) return false;
		return title.length > 100 ? title.substr(0, 100) + ' ...' : title;
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
		share(){
      var content = this.get('postContent');
			var url = this.get('utils').findUrls(content).get(0)
      if(this.get('site.title')){
        content = this._removeLink(content, url);
      }
      var data = {
				site: this.get('postAsNew.site'),
        content: content && content.trim(),
        categories: _.map(this.get('categories'), 'id'),
      }

      this.sendAction('submit', data, ()=>{
        this.get('elem').foundation('close');
        this._resetForm();
      })
      // Ember.run.later(()=>{
      //   this.get('elem').find('textarea').get(0).style.height = '';
      // })
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
		}
	}
});
