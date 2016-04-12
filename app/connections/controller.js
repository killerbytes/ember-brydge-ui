import Ember from 'ember';

export default Ember.Controller.extend({
	selectedAccept: null,
	selectedReject: null,

  actions: {
  	selectAcceptItem: function(item) {
  		console.log('selectedAccept',item);
  		this.set('selectedAccept', item);
  	},
  	selectRejectItem: function(item) {
  		console.log('selectedReject',item);
  		this.set('selectedReject', item);
  	}
  }
});
