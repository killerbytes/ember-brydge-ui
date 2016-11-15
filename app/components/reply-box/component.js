import Ember from 'ember';
import CommentActionsMixin from 'web/mixins/comment-actions';

export default Ember.Component.extend(CommentActionsMixin,{
	store: Ember.inject.service(),
	sessionAccount: Ember.inject.service(),
	session: Ember.inject.service(),
	classNameBindings: ['canReply', 'showComments'],
	init(){
		this._super(...arguments);
	},
	notAuthenticated: Ember.computed.equal('session.isAuthenticated', false),
	sortProps: ['insertedAt:asc'],
  subComments: Ember.computed.sort('comment.subComments', 'sortProps'),
	isMore: Ember.computed('perPage', 'page', function(){
		return Math.ceil(this.get('total') / (this.get('perPage') * (this.get('page')) )) > 1 ? true: false;
	}),
	showForm: Ember.computed.or('canReply', 'showComments'),
	list: Ember.computed(function(){
		return [];
	}),
	_loadComments(){
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
		this._loadComments();
	},
	_hide(){
		this.set('showComments', false);
		this.set('page', 0);
	},
	_submit(item, event) {
		var value = this.get('commentContent');
		if(!value.trim().length > 0) return false;

		var comment = this.get('store').createRecord('sub-comment',{
			content: value.trim(),
			commentid: this.get('comment.id')
		});

		this.set('commentContent', null);
		Ember.run.later(()=>{
			this.$('textarea').get(0).style.height = '';
		})
		comment.save().then(res=>{
			this.get('comment.subComments').pushObject(res);
			if(!this.get('showComments')){
				this.set('showComments', true)
				this._loadComments();
			}else{
				this.set('post.commentCount', this.get('post.commentCount')+1);
			}
		})
	},
	actions:{
		reply(){
			this.set('canReply', true);
			this.$('.content-editable').focus();
		}
	}
});
