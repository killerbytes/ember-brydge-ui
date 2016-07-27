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
	model: Ember.computed(function(){
		return this.get('store').createRecord('education');
	}),
	actions: {
		update: function (item) {
			console.log(item)
			this.$('ul.accordion').foundation('toggle', $('.accordion-content'))
			item.save(()=>{
				Ember.get(this, 'flashMessages').success('Success!');
			});

		},
		create: function () {
			this.get('model').save().then(() => {
				Ember.get(this, 'flashMessages').success('Success!');
				this.$('ul.accordion').foundation('toggle', $('.accordion-content'))
				Foundation.reInit($('ul.accordion'))
			})
		},
		delete: function(item){
			item.destroyRecord();
		}


	}
});
