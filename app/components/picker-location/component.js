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
		select(location){
			this.set('selectedText', location.description)
			this.sendAction('select', location);
			this.$('.accordion').foundation('toggle', this.$('.accordion-content'));
		}
	}
});
