import Ember from 'ember';

export default Ember.Mixin.create({
	store: Ember.inject.service(),

	 viewComments: function (postid) {
	 	console.log('<< viewComments Mixin =>', postid);

 		var store = this.get('store');
		// var post = 
		store.findRecord('newsfeed', postid).then((res)=>{
			store.query('comment',postid).then((comments)=>{
				console.log('<<<<<<', comments)
				res.set('comments', comments);
			})

		})
		// console.log(post.get('comments'))

	 }
});
