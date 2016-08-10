import Ember from 'ember';

export default Ember.Mixin.create({
	store: Ember.inject.service(),
	ajax: Ember.inject.service(),
	routing: Ember.inject.service(),
	notification: Ember.inject.service(),
	sort: ['createdAt:desc'],
	views: Ember.computed.sort('notification.view', 'sort'),
	requests: Ember.computed.sort('notification.request', 'sort'),
	messages: Ember.computed.sort('notification.message', 'sort'),
	notifications: Ember.computed.sort('notification.notification', 'sort'),
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
			switch(item.get('type')){
				case 'comment':
				case 'vote':
				case 'share':
					var targetid = item.get('targetid');
					var referenceid = item.get('referenceid');
					this.get('routing').transitionTo('post',targetid, referenceid);
					break;
				case 'ask':
					var referenceid = item.get('referenceid');
					this.get('routing').transitionTo('me.ask.detail', referenceid);
					break;
				case 'answer':
					var referenceid = item.get('referenceid');
					this.get('routing').transitionTo('ask.detail', referenceid);
					break;
				case 'compliment':
					var referenceid = item.get('referenceid');
					this.get('routing').transitionTo('me.compliments.detail', referenceid );
					break;
				case 'accept':
					this.get('routing').transitionTo('profile', item.get('targetid'));
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
