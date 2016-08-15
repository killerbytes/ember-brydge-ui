import Ember from 'ember';

export default Ember.Mixin.create({
	store: Ember.inject.service(),
	ajax: Ember.inject.service(),
	routing: Ember.inject.service(),
	notification: Ember.inject.service(),
	sort: ['createdAt:desc'],
	loading: Ember.computed(function(){
		return {};
	}),
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
			this.set('loading.'+type, true)
			this.get('notification').loadNotifications(type, ()=>{
				this.set('loading.'+type, false)
			});
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
			this.get('store').findRecord('connection', item.get('referenceid')).then(res=>{
				res.set('status', 'accepted');
				res.save().then(()=>{
					this.get('requests').removeObject(item);
					this.get('notification').check();
				})
			})
		},
		//
		rejectConnection: function(item) {
			this.get('store').peekRecord('connection', item.get('referenceid')).then(connection=>{
				connection.destroyRecord().then(()=>{
					this.get('requests').removeObject(item);
					this.get('notification').check();
				});
			})
		},

	}
});
