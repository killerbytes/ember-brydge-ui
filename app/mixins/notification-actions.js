import Ember from 'ember';

export default Ember.Mixin.create({
	store: Ember.inject.service(),
	ajax: Ember.inject.service(),
	routing: Ember.inject.service(),
	notification: Ember.inject.service(),
	sort: ['createdAt:desc'],
	views: Ember.computed.sort('notification.views', 'sort'),
	requests: Ember.computed.sort('notification.requests', 'sort'),
	messages: Ember.computed.sort('notification.messages', 'sort'),
	notifications: Ember.computed.sort('notification.notifications', 'sort'),
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
					var targetid = item.get('targetid');
					var referenceid = item.get('referenceid');
					this.get('routing').transitionTo('post',targetid,referenceid);
					break;
				case 'vote':
					var threadid = item.get('shortid');
					var targetid = item.get('targetid');
					this.get('routing').transitionTo('post',targetid,threadid);
					break;
				case 'ask':
				case 'answer':
					var referenceid = item.get('referenceid');
					this.get('routing').transitionTo('me.ask.detail', referenceid);
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
		acceptConnection: function(item) {
			this.get('store').findRecord('connection', item.get('referenceid')).then(connection=>{
				connection.set('status', 'accepted');
				connection.save().then(res=>{
					this.get('routing').transitionTo('profile', item.get('targetid'));
				})
			})
		},
		//
		rejectConnection: function(item) {
			this.get('store').findRecord('connection', item.get('referenceid')).then(connection=>{
				connection.destroyRecord();
			})
		},

	}
});
