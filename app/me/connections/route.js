import Ember from 'ember';

export default Ember.Route.extend({
	model: function() {
		// var userid = this.get('session.data.authenticated.user_id');

		// this.set('userid', userid);

		// this.store.unloadAll('connection');
		// return Ember.RSVP.hash({
		// 	pendingList: this.store.query('connection',{to: userid},{reload: true}).then((connections)=>{
		// 		return connections.filterBy('status','pending');
		// 	}),
		// 	acceptedList: this.store.findAll('connection',{reload: true}).then((connections)=>{
		// 		return connections.filterBy('status','accepted');
		// 	})
		// });
		return this.store.findAll('connection');
	},

	// setupController: function(controller, model) {
 //    let ctx = this;

 //    model.pendingListTop = model.pendingList.splice(0,1);
    
 //   	model.acceptedList.forEach(function(item){
	//     item.get('from').then((user)=>{
	    	
	//     	if(ctx.get('userid') === user.get('userid')) {
	//     		item.set('from', item.get('to')); 
	//     	}
	//     })
	//    });

 //    this._super(controller, model);
 //  },

	actions: {
    selected: function(item) {
      this.set('controller.selected', item);
    }
  }
});
