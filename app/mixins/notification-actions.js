import Ember from 'ember';

export default Ember.Mixin.create({
	store: Ember.inject.service(),
	ajax: Ember.inject.service(),
	routing: Ember.inject.service(),
	notification: Ember.inject.service(),
	sort: ['createdAt:desc'],
	views: Ember.computed.sort('notification.views', 'sort'),
	connection: Ember.computed.sort('notification.connection', 'sort'),
	_read(item){
		item.set('read', true);
		item.save();
	},
	actions: {
		read(item){
			this._read(item);
		},
		open(type){
			this.get('notification').loadNotifications(type);
		},
		select: function(item) {
			console.log(item);
			switch(item.get('type')){
				case 'compliment':
					this.get('routing').transitionTo('me.compliments.detail', item.get('referenceid') );
					break;
				case 'comment':
					var threadid = item.get('shortid');
					var targetid = item.get('targetid');
					this.get('routing').transitionTo('post',targetid,threadid);
					break;
				case 'vote':
					var threadid = item.get('shortid');
					var targetid = item.get('targetid');
					this.get('routing').transitionTo('post',targetid,threadid);
					break;
				case 'ask':
					var targetid = item.get('shortid');
					this.get('routing').transitionTo('me.ask.pending',{ queryParams: { qid: targetid } });
					break;
				case 'answer':
					var targetid = item.get('shortid');
					this.get('routing').transitionTo('me.ask',{ queryParams: { tab: 'asked',qid: targetid } });
					break;
				case 'accept':
					this.get('routing').transitionTo('profile', item.get('targetid'));
					break;
				case 'share':
					var threadid = item.get('shortid');
					var targetid = item.get('user').get('id');
					this.get('routing').transitionTo('post',targetid,threadid);
					break;
			};

			this._read(item);
		},

		// selectMessage: function(item) {
		// 	console.log('selectMessage =>', item);
		// 	var type = item.get('type');
		// 	console.log('type =>', type);
		//
		// 	if(type == 'message') {
		//
		// 		this.get('notification').readNotification(item.get('id'))
		// 		.then((res)=>{
		// 			var targetid = item.get('targetid');
		// 			console.log(targetid)
		// 			this.get('routing').transitionTo('messages.conversation', targetid);
		//
		// 			// unload
		// 			this.get('store').unloadAll('notification');
		//
		// 			// reload
		// 			this.get('notification').checkForNotifications();
		// 		})
		// 	}
		// },
		//
		acceptConnection: function(item) {
			this.get('store').findRecord('connection', item.get('referenceid')).then(connection=>{
				connection.set('status', 'accepted');
				connection.save().then(res=>{
					this._read(item);
					this.get('routing').transitionTo('profile', item.get('targetid'));
					this.get('connection').removeObject(item);
				})
			})
		},
		//
		rejectConnection: function(item) {
			this.get('store').findRecord('connection', item.get('referenceid')).then(connection=>{
				this._read(item);
				this.get('connection').removeObject(item);
				connection.destroyRecord();
			})
		},
		//
		// selectView: function(item) {
		// 	console.log('go to profile');
		// 	this.get('notification').readNotification(item.get('id'))
		// 	.then((res)=>{
		// 		this.get('routing').transitionTo('profile',item.get('shortid'));
		// 		// unload
		// 			this.get('store').unloadAll('notification');
		//
		// 			// reload
		// 			this.get('notification').checkForNotifications();
		// 	})
		//
		//
		// },
		//
		// clickNotification: function(count) {
		// 	console.log('clicked notification', count);
		// 	//if(_.isUndefined(count)) return;
		//
		// 	//
		// 	// load notifications
		// 	//
		// 	this.get('notification').loadNotifications('general');
		//
		// 	var url = '/v2/notifications/release';
    // 	this.get('ajax').request(url, {
	  //     method: 'POST',
	  //     data: {
	  //     	notification: count
	  //     }
	  //   })
    // 	.then((resp)=>{
    // 		this.get('notification').checkNotificationCounts();
    // 	})
		// },
		//
		// clickMessage: function(count) {
		// 	console.log('clicked message', count);
		// 	//if(_.isUndefined(count)) return;
		//
		// 	//
		// 	// load notifications
		// 	//
		// 	this.get('notification').loadNotifications('message');
		//
		// 	var url = '/v2/notifications/release';
    // 	this.get('ajax').request(url, {
	  //     method: 'POST',
	  //     data: {
	  //     	message: count
	  //     }
	  //   })
    // 	.then((resp)=>{
    // 		this.get('notification').checkNotificationCounts();
    // 	})
		// },
		//
		// clickConnection: function(count) {
		// 	console.log('clicked connection', count);
		// 	//if(_.isUndefined(count)) return;
		//
		// 	//
		// 	// load notifications
		// 	//
		// 	this.get('notification').loadNotifications('connection');
		//
		// 	var url = '/v2/notifications/release';
    // 	this.get('ajax').request(url, {
	  //     method: 'POST',
	  //     data: {
	  //     	connection: count
	  //     }
	  //   })
    // 	.then((resp)=>{
    // 		this.get('notification').checkNotificationCounts();
    // 	})
		// },
		//
		// clickProfile: function(count) {
		// 	console.log('clicked profile', count);
		// 	//if(_.isUndefined(count)) return;
		//
		// 	//
		// 	// load notifications
		// 	//
		// 	this.get('notification').loadNotifications('views');
		//
		// 	// var url = '/v2/notifications/release';
    // 	// this.get('ajax').request(url, {
	  //   //   method: 'POST',
	  //   //   data: {
	  //   //   	profile: count
	  //   //   }
	  //   // })
    // 	// .then((resp)=>{
    // 	// 	this.get('notification').checkNotificationCounts();
    // 	// })
		// }

	}
});
