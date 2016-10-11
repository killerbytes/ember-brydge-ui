import Ember from 'ember';
import SharePostIndustryPicker from 'web/mixins/industry';
import _ from 'lodash/lodash';

export default Ember.Component.extend(SharePostIndustryPicker, {
	sessionAccount: Ember.inject.service(),
	postAsNew: Ember.inject.service(),
	utils: Ember.inject.service(),
	item: Ember.computed.alias('postAsNew'),
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
		share(){
			console.log(this.get('postAsNew.post'))
			return false;
			var site = {
				author_name:"Paul Sawers",
				author_url:"http://venturebeat.com/author/paul-sawers/",
				description:"Ten years ago today",
				hash:"ED4A2D2C7807C5F317FE727956E3F6B8",
				image:"https://storage.googleapis.com/brydge-assets/crawler/ED4A2D2C7807C5F317FE727956E3F6B8/photo_20161007_164637-01-780x523.jpeg",
				original_image:"http://1u88jj3r4db2x4txp44yqfj1.wpengine.netdna-cdn.com/wp-content/uploads/2016/10/photo_20161007_164637-01-780x523.jpeg",
				provider_name:"VentureBeat",
				provider_url:"http://venturebeat.com",
				site_name:"VentureBeat",
				site_url:"http://venturebeat.com",
				thumbnail_height:523,
				thumbnail_url:"http://1u88jj3r4db2x4txp44yqfj1.wpengine.netdna-cdn.com/wp-content/uploads/2016/10/photo_20161007_164637-01-780x523.jpeg",
				thumbnail_width:780,
				title:"Google acquired YouTube 10 years ago today",
				type:"link",
				url:"http://venturebeat.com/2016/10/09/google-acquired-youtube-10-years-ago/",
				version:"1.0"
			}

      var content = this.get('postContent');
			var url = this.get('utils').findUrls(this.get('postContent')).get(0)
      var content = this.get('postContent');
      if(this.get('site.title')){
        content = this.get('utils')._removeLink(this.get('postContent'), url);
      }

      var data = {
				site: site,
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
