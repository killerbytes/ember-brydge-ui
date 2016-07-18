import Ember from 'ember';

export default Ember.Component.extend({
	ask: Ember.inject.service(),
	classNames: ['box', 'ask-card'],
	actions: {
		toggleHide(item, list){
      this.get('ask').hide(item).then(res=>{
				if(list) list.removeObject(item);
			});
    }
	}
});
