import Ember from 'ember';

export default Ember.Component.extend({
	tagName: 'button',
	classNames: ['button'],
	classNameBindings: ['isLoading:is-loading'],
	isLoading: false,
	actions: {
		click: function( targetid ) {
		}
	},

	click: function(){
		this.set('isLoading', true)
		this.sendAction('clicked', ()=>{ 
			this.set('isLoading', false)
		});
	}
});