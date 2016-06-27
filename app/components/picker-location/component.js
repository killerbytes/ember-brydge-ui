import Ember from 'ember';

export default Ember.Component.extend({
	ask: Ember.inject.service(),
	utils: Ember.inject.service(),
	store: Ember.inject.service(),
	classNames: ['accordion-picker'],
	selectedText: Ember.computed('selected', function(){
		return this.get('selected') ? this.get('selected') : 'Everywhere';
	}), 
	actions: {
		select(text){
			this.set('selectedText', text)
			this.sendAction('select', text);
			this.$('.accordion-picker').foundation('toggle', this.$('.accordion-content'));
		}
	}
});
