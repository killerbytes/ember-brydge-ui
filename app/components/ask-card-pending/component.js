import Ember from 'ember';

export default Ember.Component.extend({
	classNames: ['box'],
	ask: Ember.inject.service(),
	session: Ember.inject.service(),
	isOwner: Ember.computed('item', function(){
		return this.get('item.to.id') == this.get('session.data.authenticated.user_id');
	}),
  actions: {
  	select(item) {
  		this.set('ask.question', item);
  	},
    delete(item){
      this.get('ask').delete(item);
    },
  }

});
