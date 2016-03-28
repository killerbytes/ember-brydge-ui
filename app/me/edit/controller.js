import Ember from 'ember';

export default Ember.Controller.extend({
  // add work form
  isNewWork: false,
  // add education form
  isNewEducation: false,
  //
  // select 2 binding
  //
  chosenIndustry: null,
  chosenOccupTwo: null,
  chosenOccupOne: null,

  // propertyObserver: function () {
  //   var firstName = this.get('model.firstName');
  //   console.log('changes firstName (Controller) =>', firstName);
  // }.observes('model.firstName'),

  actions: {
  	addNewWork: function() {
  		console.log('add new work');
  		this.set('isNewWork', true);
  	},
  	cancelWork: function(){
  		console.log('cancel work');
  		this.set('isNewWork', false);
  	},
  	addNewEducation: function() {
  		console.log('add new education');
  		this.set('isNewEducation', true);
  	},
  	cancelEducation: function(status){
  		console.log('cancel education');
  		this.set('isNewEducation', status);
  	}
  }
});
