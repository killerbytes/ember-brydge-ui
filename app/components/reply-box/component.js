import Ember from 'ember';
import CommentActionsMixin from 'web/mixins/comment-actions';

export default Ember.Component.extend(CommentActionsMixin,{
	store: Ember.inject.service(),
	postService: Ember.inject.service(),
	commentSvc: Ember.inject.service(),
	sessionAccount: Ember.inject.service(),
	session: Ember.inject.service(),
	classNameBindings: ['canReply', 'showComments'],
	init(){
		this._super(...arguments);
		if(this.get('expanded') && this.get('comment.subCommentsCount')) this.loadComments();
	},
	isPostOwner: Ember.computed(function(){
		return this.get('session.data.authenticated.user_id') === this.get('post.user.id');
	}),
	isCommentOwner: Ember.computed(function(){
		return this.get('session.data.authenticated.user_id') === this.get('comment.user.id');
	}),
	notAuthenticated: Ember.computed.equal('session.isAuthenticated', false),
	sortProps: ['insertedAt:asc'],
  subComments: Ember.computed.sort('comment.subComments', 'sortProps'),
	isMore: Ember.computed('perPage', 'page', function(){
		return Math.ceil(this.get('total') / (this.get('perPage') * (this.get('page')) )) > 1 ? true: false;
	}),
	showForm: Ember.computed.or('canReply', 'showComments'),
	replyText: Ember.computed('comment.subCommentsCount', function(){
		return this.get('comment.subCommentsCount') > 1 ? 'Replies' : 'Reply';
	}),
	list: Ember.computed(function(){
		return [];
	}),
	loadComments(){
			this.set('isLoading', true);
			var page = this.get('page') + 1 || 0;
			this.get('store').query('sub-comment', {
				commentid: this.get('comment.id'),
				page: page,
				per_page: this.get('perPage')
			}).then(res=>{
				var meta = res.get('meta');
				this.set('total', meta.total);
				this.set('page', parseInt(meta.currentPage));
				this.set('comment.subCommentsCount', meta.total );
				this.set('showComments', true);
				this.get('comment.subComments').pushObjects(res);
				this.set('isLoading', false);
			})
	},
	_show(){
		this.loadComments();
	},
	_hide(){
		this.set('showComments', false);
		this.set('comment.subComments', []);
		this.set('page', 0);
	},
	_submit(item, event) {
		var value = this.get('commentContent');
		if(!value.trim().length > 0) return false;
		this.set('commentContent', null);
		this.get('commentSvc').create('sub-comment', {
			content: value.trim(),
			commentid: this.get('comment.id')
		}).then(res=>{
			this.get('comment.subComments').pushObject(res);
			if(!this.get('showComments')){
				this.set('showComments', true)
				this.loadComments();
			}else{
				this.set('comment.subCommentsCount', this.get('comment.subCommentsCount')+1);
			}
		})
	},
	actions:{
		reply(){
			this.set('canReply', true);
			this.$('.content-editable').focus();
		},
		delete(item, sub){
			item.set('sub', sub);
			this.set('commentSvc.data', item);
			$(`#dialog-box-comment-delete-${this.get('post.id')}`).foundation('open');
		}
	}
});
