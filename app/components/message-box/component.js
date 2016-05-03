import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['message-box'],
	actions: {
  	compose: function(to, msg) {
  		console.log('compose message', to, msg);

  		var store = this.store;
  		var ctx = this;

      var message = store.createRecord('message', {
        content: msg
      });

      store.findRecord('user', to).then(function(user) {
        
        // set 'to' for message
        message.set('to', user);

        // save message
        message.save().then(function(){
          
          console.log('success');
          // success compose message
          // return resp to route
          ctx.sendAction('resp', { to: to});

          //store.set('message',store.createRecord('message'));

          // Reset the text message field
          //ctx.set( 'to', '' );
          ctx.set('msg', '');
    
        });
      });
  	}
  }
});
