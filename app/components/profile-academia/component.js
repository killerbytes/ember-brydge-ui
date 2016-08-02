import Ember from 'ember';
import Validations from '../../models/validations/education';

export default Ember.Component.extend(Validations, {
	store: Ember.inject.service(),
	utils: Ember.inject.service(),
	flashMessages: Ember.inject.service(),
	classNames: ['accordion-form'],
	tagName: 'form',
	maxYear: moment().year() + 10,
	list: Ember.computed.filterBy('items', 'isNew', false),
	default: function(){
		return this.get('store').createRecord('education', {endAt: new Date()});
	},
	item: Ember.computed(function(){
		return this.default();
	}),
	actions: {
		update(data, cb) {
			data.save().then(()=>{
				this.$('ul.accordion').foundation('toggle', $('.accordion-content'));
				cb.apply();
			});

		},
		create(data, cb) {
			this.get('item').save().then(() => {
				cb.apply();
				Ember.run.later(()=>{
					this.$('ul.accordion').foundation('toggle', $('.accordion-content'));
					Foundation.reInit($('ul.accordion'));
					this.set('item', this.default());
				})
			})
		},
		delete(item){
			item.destroyRecord();
		},
		clear(){
			this.set('item', this.default());
		}


	}
});
