import Ember from 'ember';

export default Ember.Component.extend({
  postAsNew: Ember.inject.service(),
	classNames: ['newsfeed-item', 'newsfeed-trending', 'box', 'rounded'],
	title: Ember.computed('post.title', function(){
		let title = this.get('post.title');
		return title.length > 100 ? title.substr(0, 100) + ' ...' : title;
	}),
  willDestroyElement(){
    if(this.$('.has-tip').length != 0) this.$('.has-tip').foundation('destroy');
	},
	actions: {
		share(post){
      this.set('postAsNew.site', post);
		},
    viewComments: function() {
			this.$('.content-editable').focus();
		},
    
	}
});
