import Ember from 'ember';

export default Ember.Mixin.create({
	store: Ember.inject.service(),
	routing: Ember.inject.service(),
	actions: {
		select: function(item) {
			console.log(item.get('type'), item);

			this.get('notification').readNotification(item.get('id'))
				.then((res)=>{

					var type = item.get('type');

					if(type == 'compliment') {
						var targetid = item.get('shortid');
						this.get('routing').transitionTo('me.compliments.pending',{ queryParams: { qid: targetid } });
					}else if(type == 'comment') {
						var threadid = item.get('shortid');
						var targetid = item.get('targetid');
						this.get('routing').transitionTo('post',targetid,threadid);
					}else if(type == 'vote') {
						var threadid = item.get('shortid');
						var targetid = item.get('targetid');
						this.get('routing').transitionTo('post',targetid,threadid);
					}else if(type == 'ask') {
						var targetid = item.get('shortid');
						console.log(targetid)
						this.get('routing').transitionTo('me.ask.pending',{ queryParams: { qid: targetid } });
					}
					else if(type == 'answer') {
						var targetid = item.get('shortid');
						this.get('routing').transitionTo('me.ask',{ queryParams: { tab: 'asked',qid: targetid } });
					}
					else if(type == 'accept') {
						var targetid = item.get('targetid');
						this.get('routing').transitionTo('me.connections',{ queryParams: { targetid: targetid } });
					}
					else if(type == 'share') {
						var threadid = item.get('shortid');
						var targetid = item.get('user').get('id');
						this.get('routing').transitionTo('post',targetid,threadid);
					}

					// unload
					this.get('store').unloadAll('notification');

					// reload
					//this.get('store').findAll('notification',{ reload: true });
					this.get('notification').checkForNotifications();
				});
			
		},

		selectMessage: function(item) {
			console.log('selectMessage =>', item);
			var type = item.get('type');
			console.log('type =>', type);

			if(type == 'message') {
			
				this.get('notification').readNotification(item.get('id'))
				.then((res)=>{
					var targetid = item.get('targetid');
					console.log(targetid)
					this.get('routing').transitionTo('messaging.conversation', targetid);

					// unload
					this.get('store').unloadAll('notification');

					// reload
					this.get('notification').checkForNotifications();
				})
			}
		}
	}
});
