import Ember from 'ember';

export default Ember.Component.extend({
	content: Ember.computed('text', function(){
		return this.get('text');
	}),
	didRender(){
		this.$().linkify({target: '_blank'});
	}
});
