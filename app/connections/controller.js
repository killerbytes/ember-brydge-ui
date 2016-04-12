import Ember from 'ember';

export default Ember.Controller.extend({
	selectedAccept: null,
	selectedReject: null,

  actions: {
  	selectAcceptItem: function(item) {
  		console.log('selectedAccept');
      console.log(item.get('from').get('userid'),item.get('from').get('name'))
  		this.set('selectedAccept', item);
  	},
  	selectRejectItem: function(item) {
  		console.log('selectedReject');
      console.log(item.get('from').get('userid'),item.get('from').get('name'))
  		this.set('selectedReject', item);
  	}
  }
});
