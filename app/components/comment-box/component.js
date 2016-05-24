import Ember from 'ember';
import ViewCommentsActionMixin from 'web/mixins/view-comments-action';


export default Ember.Component.extend(ViewCommentsActionMixin,{
	store: Ember.inject.service(),
	sessionAccount: Ember.inject.service(),
	avatarUrl: Ember.computed(function(){
		return this.get('sessionAccount.account.avatarUrl');
	}),
	isExpend: false,
	actions:{
		comment(item, e) {
			if(!item.get('value').trim().length > 0) return false;
			this.sendAction('postComment', item.get('value'), this.get('post.id'));

			// Fetch reference to store as a
      // property on this component 
      var store = this.get('store');
      var post = store.peekRecord('newsfeed', this.get('post.id'));

      var comment = store.createRecord('comment',{ 
				content: item.get('value').trim(), 
				threadId: this.get('post.id')
			});
    	item.set('value',null);
			
      comment.save().then(()=>{
      	console.log('save comment')

      	// $("#"+this.get('post.id')).trigger('click');
      	post.set('commentCount',post.get('commentCount')+1);
      })

      //$(".accordion li").removeClass("active").addClass("active");

		},

		viewComments: function () {
			console.log('view comments', this.get('post.id'));

			this.viewComments(this.get('post.id'));
		}
	}
});
