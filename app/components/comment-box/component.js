import Ember from 'ember';
import CommentActionsMixin from 'web/mixins/comment-actions';

export default Ember.Component.extend(CommentActionsMixin,{
	store: Ember.inject.service(),
	session: Ember.inject.service(),
	commentSvc: Ember.inject.service(),
	tagName: 'section',
	classNames: ['container', 'comments'],
	isMore: Ember.computed('perPage', 'page', function(){
		return Math.ceil(this.get('total') / (this.get('perPage') * (this.get('page')) )) > 1 ? true: false;
	}),
	init(){
		this._super(...arguments);
		if(this.get('expanded') && this.get('total')) this._loadComments();
	},
	notAuthenticated: Ember.computed.equal('session.isAuthenticated', false),
	sortProps: ['insertedAt:asc'],
  comments: Ember.computed.sort('post.comments', 'sortProps'),
	commentObserver: Ember.observer('comments', function(){
		if(this.get('comments.length') === 0){
			 this.set('showComments', false);
		}else{
			 this.set('showComments', true);
		}
	}),
	_loadComments(){
		this.set('isLoading', true);
		var page = this.get('page') + 1 || 0;
		this.get('commentSvc').load(this.get('post.id'), this.get('type'), page)
		.then(res=>{
			var meta = res.get('meta');
			this.set('total', meta.total);
			this.set('page', parseInt(meta.currentPage));
			this.set('post.commentCount', meta.total );
			this.set('showComments', true);
			this.get('post.comments').pushObjects(res);
			this.set('isLoading', false);
			this.set('expanded', true);
		})
	},
	_submit(){
		var value = this.get('commentContent');
		if(!value.trim().length > 0) return false;

		this.set('commentContent', null); //reset textarea

		this.get('commentSvc').create('comment', {
					content: value.trim(),
					targetid: this.get('post.id'),
					category: this.get('type')
				}).then(res=>{
					this.get('post.comments').pushObject(res);
					if(!this.get('showComments')){
						this.set('showComments', true)
						this._loadComments();
					}else{
						this.set('post.commentCount', this.get('post.commentCount')+1);
					}
				})
	},
	_hide(){
		this.set('showComments', false)
		this.set('page', 0)
		this.set('post.comments', []);
	},
	_show(){
		if(!this.get('showComments')) this.set('post.comments', []);
		this._loadComments();
	},
	actions: {
		reply(item){
			item.set('canReply', true);
		},
		delete(item){
			this.set('commentSvc.parent', this.get('post'));
			this.set('commentSvc.data', item);
			$(`#dialog-box-comment-delete-${this.get('post.id')}`).foundation('open');
		}


	}
});
