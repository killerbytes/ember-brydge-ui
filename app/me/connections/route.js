import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
	session: Ember.inject.service(),
	model: function() {
		// this.store.unloadAll('connection');
		return this.store.query('connection', {userid: this.get('session.data.authenticated.user_id')});
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
