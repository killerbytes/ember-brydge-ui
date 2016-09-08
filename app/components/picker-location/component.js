import Ember from 'ember';

export default Ember.Component.extend({
	ask: Ember.inject.service(),
	utils: Ember.inject.service(),
	store: Ember.inject.service(),
	classNames: ['accordion-picker'],
	selectedText: Ember.computed('selected', function(){
		return this.get('selected') ? this.get('selected') : {description: 'All Cities'};
	}),
	_setLocation(location){
		this.set('selectedText', location)
		this.sendAction('select', location);
		this.$('.accordion').foundation('toggle', this.$('.accordion-content'));
	},
	actions: {
		selectSwitch(type){
			switch(type){
				case "profile":
					this._setLocation({
						place_id: this.get('profile.placeid'),
						description: this.get('profile.location')
					})
					break;
				case "all":
					this._setLocation({
						place_id: null,
						description: "All Cities"
					})
					break;
			}
		},
		select(location){
			this._setLocation(location);
		}
	}
});
