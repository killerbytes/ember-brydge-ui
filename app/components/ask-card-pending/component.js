import Ember from 'ember';

export default Ember.Component.extend({
	classNames: ['box'],
	ask: Ember.inject.service(),
	session: Ember.inject.service(),
	isOwner: Ember.computed('item', function(){
		return this.get('item.to.id') == this.get('session.data.authenticated.user_id');
	}),
	isPending: Ember.computed.equal('item.status', 'pending'),
  actions: {
  	select(item) {
  		this.set('ask.question', item);
  	},
    delete(){
      this.get('ask').delete(this.get('item')).then(res=>{
				this.sendAction("submit");
			});
    },
		flag(){
      this.get('ask').delete(this.get('item')).then(res=>{
				this.sendAction("submit");
			});
    },
		submit(){
			this.sendAction("submit");
		}
  }

});
