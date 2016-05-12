import Ember from 'ember';

export default Ember.Controller.extend({
	store: Ember.inject.service(),
	actions: {
		save(){
	    this.get('store').createRecord('post', {
	      content: 'test',
	      categories: [],
	    }).save().then((res)=>{
	    	// console.log(res)
	    	this.get('model').addObject(res._internalModel)

	    });

			
		}
	}
});
