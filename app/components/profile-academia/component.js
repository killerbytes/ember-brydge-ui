import Ember from 'ember';
import Validations from '../../models/validations/education';

export default Ember.Component.extend(Validations, {
	store: Ember.inject.service(),
	utils: Ember.inject.service(),
	flashMessages: Ember.inject.service(),
	classNames: ['accordion-form'],
	tagName: 'form',
	maxYear: moment().year() + 6,
	list: Ember.computed.filterBy('items', 'isNew', false),
	default: Ember.computed(function(){
		return this.get('store').createRecord('education', {endAt: new Date()});
	}),
	item: Ember.computed(function(){
		return this.get('default');
	}),
	actions: {
		update: function (item) {
			this.$('ul.accordion').foundation('toggle', $('.accordion-content'))
			item.save(()=>{
				Ember.get(this, 'flashMessages').success('Success!');
			});

		},
		create: function () {
			this.get('item').save().then(() => {
				Ember.run.later(()=>{
					this.$('ul.accordion').foundation('toggle', $('.accordion-content'));
					Foundation.reInit($('ul.accordion'));
					this.set('item', this.get('default'));
				})
			})
		},
		delete: function(item){
			item.destroyRecord();
		}


	}
});
