import Ember from 'ember';

export default Ember.Route.extend({
	session: Ember.inject.service(),
	notification: Ember.inject.service(),
	model: function() { 
		return this.store.findAll('notification',{ reload: true });
    // return Ember.RSVP.hash({
    //   notifications: this.store.findAll('notification',{ reload: true })
    // });
  },
	
	actions: {
		select: function(item) {
			console.log(item.get('type'), item.get('id'));

			var type = item.get('type');

			if(type == 'compliment') {
				this.transitionTo('me.compliments');
			}else if(type == 'comment') {
				var threadid = item.get('shortid');
				var targetid = item.get('targetid');
				this.transitionTo('post',targetid,threadid);
			}else if(type == 'vote') {
				var threadid = item.get('shortid');
				var targetid = item.get('targetid');
				this.transitionTo('post',targetid,threadid);
			}else if(type == 'ask') {
				var targetid = item.get('shortid');
				this.transitionTo('questions',{ queryParams: { qid: targetid } });
			}else if(type == 'connection') {
				this.transitionTo('me.connections');
			}
			else if(type == 'answer') {
				this.transitionTo('me.ask',{ queryParams: { tab: 'asked' } });
			}

			return;
			this.get('notification').readNotification(item.get('id'))
				.then((res)=>{

					// unload
					this.store.unloadAll('notification');

					// reload
					this.store.findAll('notification',{ reload: true });

					var type = item.get('type');
					if(type == 'compliment') {
						this.transitionTo('me.compliments');
					}else if(type == 'comment') {
						var threadid = item.get('shortid');
						var targetid = item.get('targetid');
						this.transitionTo('post',targetid,threadid);
					}else if(type == 'vote') {
						var threadid = item.get('shortid');
						var targetid = item.get('targetid');
						this.transitionTo('post',targetid,threadid);
					}else if(type == 'ask') {
						this.transitionTo('questions');
					}else if(type == 'connection') {
						this.transitionTo('me.connections');
					}

				});
			
		}
	},
	// setupController: function(controller, model){
 //    this._super(controller, model);
 //    controller.setProperties(model);
 //  }
});
