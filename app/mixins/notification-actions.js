import Ember from 'ember';

export default Ember.Mixin.create({
	store: Ember.inject.service(),
	session: Ember.inject.service(),
	routing: Ember.inject.service(),
	connection: Ember.inject.service(),
	notification: Ember.inject.service(),
	sort: ['createdAt:desc'],
	sortUpdated: ['updatedAt:desc'],
	loading: Ember.computed(function(){
		return {};
	}),
	views: Ember.computed.sort('notification.view', 'sort'),
	requests: Ember.computed('notification.request.@each.status', function(i) {
    var userid = this.get('session.data.authenticated.user_id');
    return this.get('notification.request') && this.get('notification.request').filter(function(i){
    	return i.get('userid.id') != userid && i.get('status') == "pending";
    })
  }),
	messages: Ember.computed.sort('notification.message', 'sortUpdated'),
	notifications: Ember.computed.sort('notification.notification', 'sort'),
	_read(item){
		item.setProperties({
			read: true,
			count: 0
		});
		item.save();
	},
	actions: {
		read(item){
			this._read(item);
		},
		open(type){
			this.set(`loading.${type}`, true);
			switch(type){
				case 'request':
					this.get('notification').loadRequests(()=>{
						this.set(`loading.${type}`, false);
					})
					break;
				default:
					this.get('notification').loadNotifications(type, ()=>{
						this.set(`loading.${type}`, false);
					});
					break;
			}
		},
		select: function(item) {
			switch(item.get('type')){
				case 'comment':
				case 'vote':
				case 'share':
				case 'reply-comment':
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
				case 'follow':
					this.get('routing').transitionTo('profile', item.get('referenceid'));
					break;
				case 'inbox':
					this.get('routing').transitionTo('me.ask.inbox');
					break;
			};

			this._read(item);
		},
		acceptConnection: function(item) {
			item.set('status', 'accepted');
			item.save().then(()=>{
				this.get('requests').removeObject(item);
				this.get('notification').check();
			});
		},
		rejectConnection: function(item) {
			item.destroyRecord().then(()=>{
				this.get('requests').removeObject(item);
				this.get('notification').check();
			});
		},

	}
});
