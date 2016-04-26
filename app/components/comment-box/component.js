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

      var comment = store.createRecord('comment',{ 
				content: this.get('commentContent'), 
				threadId: this.get('post.shortid')
			});
			
      comment.save().then(()=>{
      	console.log('save comment')
      })
		}
	}
});
