import Ember from 'ember';

export default Ember.Component.extend({
	connection: Ember.inject.service(),
	notification: Ember.inject.service(),
	tagName: 'li',
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
