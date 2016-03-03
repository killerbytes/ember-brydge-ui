import Ember from 'ember';

export default Ember.Route.extend({
	model: function() {
		console.log('post new message route')
	},
	actions: {
		compose: function(to, msg) {
      console.log("compose msg >>", to, msg);

      // let data = {
      // 	from_id: 'hein',
      // 	to_id: to,
      // 	content:
      // }

      // this.store.createRecord('message', data).save()
      //   .then(function() {
      //     // self.transitionTo('home');
      //     console.log('success save')
      //   }).catch(function(err) {
      //     console.log("Error saving user:", err);
      //   });
    }
	}
});
