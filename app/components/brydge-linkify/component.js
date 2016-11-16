import Ember from 'ember';

export default Ember.Component.extend({
	tagName: 'span',
	content: Ember.computed('text', function(){
		return this.get('text') ? linkifyStr(this.get('text')) : null;
	})
});
