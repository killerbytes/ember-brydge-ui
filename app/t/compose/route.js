import Ember from 'ember';

export default Ember.Route.extend({
	model: function() {
		console.log('post new message route')
	},
	actions: {
		compose: function(to, msg) {
      var ctx = this;
      console.log("compose msg >>", to, msg);

      this.store.createRecord('message', {
        to_id: to,
        from_id: 'hein',
        content: msg
      }).save().then(function(){
       
        //ctx.transitionTo('t');
        ctx.transitionTo('/t/'+to);


      }).catch(function(err){
        console.log('err', err);
      });
    }
	}
});
