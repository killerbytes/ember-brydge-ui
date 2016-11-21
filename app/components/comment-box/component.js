import Ember from 'ember';
import CommentActionsMixin from 'web/mixins/comment-actions';

export default Ember.Component.extend(CommentActionsMixin,{
	store: Ember.inject.service(),
	session: Ember.inject.service(),
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
	_loadComments(){
		this.set('isLoading', true);
		var page = this.get('page') + 1 || 0;
		this.get('store').query('comment', {newsfeedid: this.get('post.id'), page: page, per_page: this.get('perPage') }).then(res=>{
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
		this.sendAction('postComment', value, this.get('post.id'));

		var comment = this.get('store').createRecord('comment',{
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
});
