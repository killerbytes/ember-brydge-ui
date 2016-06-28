import Ember from 'ember';

export default Ember.Mixin.create({
	store: Ember.inject.service(),
	ajax: Ember.inject.service(),
	connection: Ember.inject.service(),
	routing: Ember.inject.service(),
	notification: Ember.inject.service(),
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
						console.log('accept',item.get('shortid'))
						this.get('routing').transitionTo('profile',item.get('shortid'));
						//this.get('routing').transitionTo('profile',{ queryParams: { targetid: targetid } });
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
		},

		acceptConnection: function(item) {
			console.log('accept connection', item.get('targetid'))
			this.get('connection').accept(item.get('targetid'))
				.then((res)=>{

					this.get('notification').readNotification(item.get('id'))
						.then((res)=>{
							// unload
							this.get('store').unloadAll('notification');

							// reload
							this.get('notification').checkForNotifications();
						})
				})
		},

		rejectConnection: function(item) {
			console.log('reject connection', item.get('id'))
		},

		selectView: function(item) {
			console.log('go to profile');
			this.get('notification').readNotification(item.get('id'))
			.then((res)=>{
				this.get('routing').transitionTo('profile',item.get('shortid'));
				// unload
					this.get('store').unloadAll('notification');

					// reload
					this.get('notification').checkForNotifications();
			})


		},

		clickNotification: function(count) {
			console.log('clicked notification', count);
			//if(_.isUndefined(count)) return;

			//
			// load notifications
			//
			this.get('notification').loadNotifications('general');

			var url = '/v2/notifications/release';
    	this.get('ajax').request(url, {
	      method: 'POST',
	      data: {
	      	notification: count
	      }
	    })
    	.then((resp)=>{
    		this.get('notification').checkNotificationCounts();
    	})
		},

		clickMessage: function(count) {
			console.log('clicked message', count);
			//if(_.isUndefined(count)) return;

			//
			// load notifications
			//
			this.get('notification').loadNotifications('message');

			var url = '/v2/notifications/release';
    	this.get('ajax').request(url, {
	      method: 'POST',
	      data: {
	      	message: count
	      }
	    })
    	.then((resp)=>{
    		this.get('notification').checkNotificationCounts();
    	})
		},

		clickConnection: function(count) {
			console.log('clicked connection', count);
			//if(_.isUndefined(count)) return;

			//
			// load notifications
			//
			this.get('notification').loadNotifications('connection');

			var url = '/v2/notifications/release';
    	this.get('ajax').request(url, {
	      method: 'POST',
	      data: {
	      	connection: count
	      }
	    })
    	.then((resp)=>{
    		this.get('notification').checkNotificationCounts();
    	})
		},

		clickProfile: function(count) {
			console.log('clicked profile', count);
			//if(_.isUndefined(count)) return;

			//
			// load notifications
			//
			this.get('notification').loadNotifications('views');

			var url = '/v2/notifications/release';
    	this.get('ajax').request(url, {
	      method: 'POST',
	      data: {
	      	profile: count
	      }
	    })
    	.then((resp)=>{
    		this.get('notification').checkNotificationCounts();
    	})
		}

	}
});
