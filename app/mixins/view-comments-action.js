import Ember from 'ember';

export default Ember.Mixin.create({
	store: Ember.inject.service(),
	 viewComments: function (postid) {
 		var store = this.get('store');
		store.findRecord('newsfeed', postid).then((res)=>{
			store.query('comment', {id: postid}).then((comments)=>{
				res.set('comments', comments);
			})
		})
	 }
});
