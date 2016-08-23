import Ember from 'ember';

export default Ember.Component.extend({
	ask: Ember.inject.service(),
	session: Ember.inject.service(),
	classNames: ['box', 'ask-card'],
	isOwner: Ember.computed('item', function(){
		return this.get('item.requestid') == this.get('item.from.id') || this.get('item.requestid') == this.get('item.to.id');
	}),
	title: Ember.computed('isArchived', function(){
		return this.get('isArchived') ? "Unarchive" : "Archive" ;
	}),
	message: Ember.computed('isArchived', function(){
		return this.get('isArchived') ? "unarchive" : "archive" ;
	}),
	isArchived: Ember.computed('item', function(){
		return this.get('item.status') == 'hide';
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
