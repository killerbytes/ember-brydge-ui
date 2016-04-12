import Ember from 'ember';

export default Ember.Controller.extend({
	selectedConnection: null,

  actions: {
  	selectItem: function(item) {
  		console.log('selectedConnection',item);
  		this.set('selectedConnection', item);
  	}
  }
});
