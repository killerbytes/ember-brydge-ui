import Ember from 'ember';
import Validations from '../../models/validations/experience';

export default Ember.Component.extend(Validations, {
	classNames: ['profile-accordion', 'no-bullet'],
	today: moment(),
	from: Ember.computed('today', function(){
		return this.get('today');
	}),
	to: Ember.computed('today', function(){
		return this.get('today');
	}),
	actions: {
		update: function (item) {
			this.sendAction('update', item, ()=>{
				this.$('ul.accordion').foundation('toggle', $('.accordion-content'))		
			});

		},
		create: function () {
			this.sendAction('create', this, ()=>{
				this.$('ul.accordion').foundation('toggle', $('.accordion-content'))	
				Foundation.reInit($('ul.accordion'))
			});
		},
		delete: function(item){
			item.destroyRecord();
		}


	}
});
