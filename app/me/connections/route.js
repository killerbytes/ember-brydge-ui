import Ember from 'ember';

export default Ember.Route.extend({

	session: Ember.inject.service('session'),
  userid: null,

	model: function() {
		var userid = this.get('session.data.authenticated.user_id');
		console.log('authenticated user =>', userid);

		this.set('userid', userid);

		this.store.unloadAll('connection');
		return Ember.RSVP.hash({
			pendingList: this.store.query('connection',{to: userid},{reload: true}).then((connections)=>{
				return connections.filterBy('status','pending');
			}),
			acceptedList: this.store.findAll('connection',{reload: true}).then((connections)=>{
				return connections.filterBy('status','accepted');
			})
		});
	},

	setupController: function(controller, model) {
    console.log('setupController');

    let ctx = this;

    model.pendingListTop = model.pendingList.splice(0,1);
    
   	model.acceptedList.forEach(function(item){
	    item.get('from').then((user)=>{
	    	
	    	console.log('from user =>', user.get('userid'))
	    	console.log('current user =>', ctx.get('userid'));

	    	if(ctx.get('userid') === user.get('userid')) {
	    		console.log('<<<< from is current user <<<<');
	    		item.set('from', item.get('to')); 
	    	}
	    })
	   });

    this._super(controller, model);
  },

	actions: {
    refreshModel: function() {
      this.refresh();
    }
  }
});
