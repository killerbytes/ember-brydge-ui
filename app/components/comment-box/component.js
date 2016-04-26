import Ember from 'ember';
import ViewCommentsActionMixin from 'web/mixins/view-comments-action';


export default Ember.Component.extend(ViewCommentsActionMixin,{
	store: Ember.inject.service(),

	actions:{
		comment: function() {
			console.log('Key pressed =>', this.get('commentContent'), this.get('post.shortid'))
			this.sendAction('postComment', this.get('commentContent'), this.get('post.shortid'));

			// Fetch reference to store as a
      // property on this component 
      var store = this.get('store');
      var post = store.peekRecord('newsfeed', this.get('post.id'));
      var self = this;

      var comment = store.createRecord('comment',{ 
				content: this.get('commentContent'), 
				threadId: this.get('post.id')
			});
			
      comment.save().then(()=>{
      	console.log('save comment')

      	$("#"+this.get('post.id')).trigger('click');
      	self.set('commentContent','');
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
