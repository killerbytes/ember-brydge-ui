import Ember from 'ember';

export default Ember.Route.extend({
	model(){
		// return this.store.findAll('newsfeed')
		return this.store.query('newsfeed',{q:null,tab:'live'})
	},
	actions: {
		add(){
			console.log(this.get('controller.txt'))


			let post = this.store.createRecord('newsfeed', {
				content: this.get('controller.txt'),
				categories: []
			});

			post.save().then((res) => {
				console.log(res)
				// this.store.unloadAll('newsfeed')
				// this.store.query('newsfeed',{q:null,tab:'live'})
				// this.refresh()
				// console.log(this, )
				this.get('currentModel').pushObject(res._internalModel);
			})

		}
	}
});
