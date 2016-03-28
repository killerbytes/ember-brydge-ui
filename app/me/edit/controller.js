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
  //
  // actions
  //
  actions: {
  	addNewWork: function() {
  		this.set('isNewWork', true);
  	},
  	
  	addNewEducation: function() {
  		this.set('isNewEducation', true);
  	}
  }
});
