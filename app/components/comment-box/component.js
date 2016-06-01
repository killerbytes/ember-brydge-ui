import Ember from 'ember';
import ViewCommentsActionMixin from 'web/mixins/view-comments-action';


export default Ember.Component.extend(ViewCommentsActionMixin,{
	store: Ember.inject.service(),
	sessionAccount: Ember.inject.service(),
	limit: 5,
	avatarUrl: Ember.computed(function(){
		return this.get('sessionAccount.account.avatarUrl');
	}),
	shouldLoad: Ember.observer('load', function(){
		this.loadComments();
	}),
	loadComments(){
			var page = this.get('page') || 1;
			this.get('store').query('comment', {id: this.get('post.id'), page: page++, limit: this.get('limit') }).then(res=>{
				this.get('post.comments').pushObjects(res);
				this.set('page', page);
			})
	},
	actions:{
		comment(item, e) {
			if(!item.get('value').trim().length > 0) return false;
			this.sendAction('postComment', item.get('value'), this.get('post.id'));

			// Fetch reference to store as a
      // property on this component 
      var store = this.get('store');

      var comment = store.createRecord('comment',{ 
				content: item.get('value').trim(), 
				threadId: this.get('post.id')
			});

    	item.set('value', null);
      store.findRecord('newsfeed', this.get('post.id')).then(post=>{
      	this.set('post', post);
	      comment.save().then(res=>{
					store.query('comment',{id: this.get('post.id')}).then(comments =>{
		      	post.set('commentCount', comments.get('content').length);
						post.set('comments', comments);
						this.$('.accordion-menu:first').foundation('down', $('.media-list'));
					})
	      })      	
      });			
		},
		viewComments: function () {
			this.loadComments();
		}
	}
});
