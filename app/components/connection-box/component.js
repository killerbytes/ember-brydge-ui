import Ember from 'ember';

export default Ember.Component.extend({
	classNames: ['box'],
	isConnected: Ember.computed('item.status', function(){
		console.log(this.get('item'))
		return this.get('item.status') == 'accepted';
	})
});
