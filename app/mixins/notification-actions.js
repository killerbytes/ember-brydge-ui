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
						this.get('routing').transitionTo('pending-compliments',{ queryParams: { qid: targetid } });
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
						this.get('routing').transitionTo('questions',{ queryParams: { qid: targetid } });
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
					this.get('store').findAll('notification',{ reload: true });

				});
			
		}
	}
});
