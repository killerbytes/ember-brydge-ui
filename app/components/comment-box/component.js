import Ember from 'ember';
import ViewCommentsActionMixin from 'web/mixins/view-comments-action';


export default Ember.Component.extend(ViewCommentsActionMixin,{
	store: Ember.inject.service(),
	sessionAccount: Ember.inject.service(),
	limit: 5, //set default
	page: 0, //set default
	isMore: Ember.computed('limit', 'page', function(){

		return Math.ceil(this.get('total') / (this.get('limit') * (this.get('page')) )) > 1 ? true: false;
	}),
	init(){
		this._super(...arguments);
		if(this.get('expanded')) this.loadComments();
	},
	sortProps: ['insertedAt:desc'],
  comments: Ember.computed.sort('post.comments', 'sortProps'),
	loadComments(){
			this.set('isLoading', true);
			var page = this.get('page') + 1 || 0;
			this.get('store').query('comment', {id: this.get('post.id'), page: page, limit: this.get('limit') }).then(res=>{
				var meta = res.get('meta');
				this.set('total', meta.total);
				this.set('page', parseInt(meta.currentPage));
				this.set('post.commentCount', meta.total );
				this.set('showComments', true);
				this.get('post.comments').pushObjects(res);
				this.set('isLoading', false);
			})
	},
	actions:{
		comment(item, e) {
			var value = this.get('commentContent');
			if(!value.trim().length > 0) return false;
			this.sendAction('postComment', value, this.get('post.id'));

			// Fetch reference to store as a
      // property on this component
      var store = this.get('store');

      var comment = store.createRecord('comment',{
				content: value.trim(),
				newsfeedid: this.get('post.id')
			});

    	this.set('commentContent', null);
    	Ember.run.later(()=>{
				this.$('textarea').get(0).style.height = '';
    	})
    	comment.save().then(res=>{
      	this.get('post.comments').pushObject(res);
      	if(!this.get('showComments')){
					this.set('showComments', true)
	      	this.loadComments();
      	}else{
      		this.set('post.commentCount', this.get('post.commentCount')+1);
      	}
    	})
      // store.findRecord('newsfeed', this.get('post.id')).then(post=>{
      	// this.set('post', post);
	      // comment.save().then(res=>{
	      	// this.loadComments();
					// this.set('post.commentCount', comments.get('content').length)
					// store.query('comment',{id: this.get('post.id')}).then(comments =>{
					//    	post.set('commentCount', comments.get('content').length);
					// 	post.set('comments', comments);
					// 	this.$('.accordion-menu:first').foundation('down', $('.media-list'));
					// })
	      // })
      // });
		},
		hideComments(){
			this.set('showComments', false)
			this.set('page', 0)
			this.set('post.comments', []);

		},
		viewComments: function () {
			// if(this.get('post.comments.content').length > 0){
				if(!this.get('showComments')) this.set('post.comments', []);
			// 		this.set('showComments', true);
			// 		console.log(12)
			// 	}else{
			// 		this.loadComments();
			// 	}
			// }else{
				this.loadComments();
			// }
		},
		resize(value, e){
			if(value){
				var el = e.currentTarget;
				var offset = (el.offsetHeight - el.clientHeight);
				e.currentTarget.style.height = 'auto';
				e.currentTarget.style.height = (e.currentTarget.scrollHeight+offset) + "px";
			}else{
				e.currentTarget.style.height = '';
			}
		}

	}
});
