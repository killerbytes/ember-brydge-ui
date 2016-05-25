import Ember from 'ember';

export default Ember.Route.extend({
	model(){
		// return this.store.findAll('newsfeed', {q: null, tab: 'live'})
		return this.store.query('newsfeed', {q:null,tab:'live'})
	},
	actions: {
		add(){
			console.log(this.get('controller.txt'))


			let post = this.store.createRecord('newsfeed', {
				content: this.get('controller.txt'),
	      sharedPostid: '911arbzinrc0',
				categories: []
			});


			post.save().then((res) => {
				// console.log(res)
				// this.store.unloadAll('newsfeed')
				// this.store.query('newsfeed',{q:null,tab:'live'})
				// this.refresh()
				// console.log(this, )
				console.log(res._internalModel)
				this.get('currentModel').pushObject(res._internalModel);
				// this.store.findRecord('newsfeed', res.get('id'));
				// this.store.query('newsfeed',{q:null,tab:'live'}).then(res=>{
				// 	console.log('newsfeed');
				// 	this.set('currentModel', res);
				// 	this.get('currentModel').forEach(function(item){
				// 		console.log(item.reload())
				// 	});

				// })
				// console.log(this.get('currentModel'))
			})

		}
	}
});
