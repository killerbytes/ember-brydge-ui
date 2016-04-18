import Ember from 'ember';

export default Ember.Route.extend({
	connection: Ember.inject.service(),
	model: function(){
		return this.store.findAll('connection');

	},
	actions: {
		accept: function(item){
			this.get('connection').accept(item)
			.then((res)=>{
				this.store.push(res);
			})
		},
		reject: function(item) {
			this.get('connection').reject(item)
			.then((res)=>{
				console.log(res)
				this.store.push(res)
			})
		}

	}
});
