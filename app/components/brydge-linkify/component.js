import Ember from 'ember';

export default Ember.Component.extend({
	content: Ember.computed('text', function(){
		return linkifyStr(this.get('text'));
	})
});
