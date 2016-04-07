import Ember from 'ember';

export default Ember.Controller.extend({
	selectedQuestion: null,

  actions: {
  	selectItem: function(item) {
  		console.log('selectItem');
  		this.set('selectedQuestion', item);
  	}
  }
});
