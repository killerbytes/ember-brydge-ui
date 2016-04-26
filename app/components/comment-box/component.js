import Ember from 'ember';

export default Ember.Component.extend({
	store: Ember.inject.service(),

	actions:{
		comment: function() {
			console.log('Key pressed =>', this.get('commentContent'), this.get('post.shortid'))
			this.sendAction('postComment', this.get('commentContent'), this.get('post.shortid'));

			// Fetch reference to store as a
      // property on this component 
      var store = this.get('store');
      var post = store.peekRecord('newsfeed', this.get('post.shortid'));
      var self = this;

      var comment = store.createRecord('comment',{ 
				content: this.get('commentContent'), 
				threadId: this.get('post.shortid')
			});
			
      comment.save().then(()=>{
      	console.log('save comment')

      	$("#"+this.get('post.shortid')).trigger('click');
      	self.set('commentContent','');
      	post.set('commentCount',post.get('commentCount')+1);
      })

      //$(".accordion li").removeClass("active").addClass("active");

		},

		viewComments: function () {
			console.log('view comments', this.get('post.shortid'));

			var store = this.get('store');

			var post = store.peekRecord('newsfeed', this.get('post.shortid'));


			store.query('comment',this.get('post.shortid')).then((comments)=>{
				console.log('<<<<<<', comments)
				post.set('comments', comments);
			})
		}
	}
});
