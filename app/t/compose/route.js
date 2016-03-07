import Ember from 'ember';

export default Ember.Route.extend({
	model: function() {
		console.log('post new message route')
	},
	actions: {
		compose: function(to, msg) {
      var ctx = this;
      console.log("compose msg >>", to, msg);

      var store = this.store;

      var message = store.createRecord('message', {
        content: msg
      });

      store.findRecord('user', to).then(function(user) {
        message.set('to', user);

        store.findRecord('user', '0yi51f1xyni').then(function(user) {
          message.set('from', user);

          store.findRecord('conversation', '0yi5rsma72i').then(function(conversation){
            message.set('conversation', conversation);

             message.save().then(function(){
              console.log('success message');
              ctx.transitionTo('/t/'+to);
            })
          })   
        });
      });

    }
	}
});
