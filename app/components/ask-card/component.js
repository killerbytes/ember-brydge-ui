import Ember from 'ember';

export default Ember.Component.extend({
	ask: Ember.inject.service(),
	session: Ember.inject.service(),
	classNames: ['box', 'ask-card'],
	isOwner: Ember.computed('item', function(){
		return this.get('session.data.authenticated.user_id') == this.get('item.requestid');
	}),
	actions: {
		toggleHide(item, list){
      this.get('ask').hide(item).then(res=>{
				if(list) list.removeObject(item);
				this.sendAction('delete');
			});
    }
	}
});
