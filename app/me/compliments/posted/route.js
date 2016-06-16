import Ember from 'ember';

export default Ember.Route.extend({
	session: Ember.inject.service(),
	compliment: Ember.inject.service(),
	actions: {
		accept: function(item) {
			console.log('accept =>', item);
			
			this.get('compliment').accept(item)
			.then((res)=>{
				console.log('accept res=>', res);
				var compliment = this.store.peekRecord('compliment',res.data.id);
	      compliment.set('status','accepted');
			});
		},
		reject: function(item) {
			console.log('reject =>', item);
			
			this.get('compliment').delete(item)
			.then((res)=>{
				var compliment = this.store.peekRecord('compliment',res.data.id);
	      compliment.set('status','rejected');
			})
		}
	}
});
