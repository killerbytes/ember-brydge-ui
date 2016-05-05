import Ember from 'ember';

export default Ember.Component.extend({
  store: Ember.inject.service(),
  classNames: ['message-box'],
	actions: {
  	compose: function(to, msg) {
  		var store = this.get('store');
  		var ctx = this;

      var message = store.createRecord('message', {
        content: msg
      });

      store.findRecord('user', to).then(function(user) {
        console.log('findRecord to')
        // set 'to' for message
        message.set('to', user);

        // save message
        message.save().then(function(res){
          
          // success compose message
          // return resp to route
          ctx.sendAction('resp', { to: to});

          //store.set('message',store.createRecord('message'));

          // Reset the text message field
          //ctx.set( 'to', '' );
          ctx.set('msg', '');
          // console.log(res);
          // store.push(res);
          console.log(store.findAll('conversation'))
    
        });
      });
  	}
  }
});
