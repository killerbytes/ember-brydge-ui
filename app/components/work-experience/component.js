import Ember from 'ember';

export default Ember.Component.extend({
	classNames: ['work-list', 'no-bullet'],
	tagName: 'ul',
	actions: {
		select: function(item){
			this.sendAction('select', item);
		}
	}
});
