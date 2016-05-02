import Ember from 'ember';

export default Ember.Route.extend({
	compliment: Ember.inject.service(),
	model: function () {
		return this.store.findAll('compliment')
	},
	actions: {
		accept: function(item) {
			console.log('accept =>', item);
			
			this.get('compliment').accept(item)
			.then((res)=>{
				console.log('accept res=>', res);
				var compliment = this.store.peekRecord('compliment',res.data.id);
	      compliment.set('status','accept');
			});
		},
		reject: function(item) {
			console.log('reject =>', item);
			
			this.get('compliment').delete(item)
			.then((res)=>{
				var compliment = this.store.peekRecord('compliment',res.data.id);
	      compliment.set('status','reject');
			})
		}
	}
});
