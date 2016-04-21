import Ember from 'ember';
import Validations from '../../models/validations/education';

export default Ember.Component.extend(Validations, {
	flashMessages: Ember.inject.service(),
	classNames: ['profile-accordion', 'no-bullet'],
	actions: {
		update: function (item) {
			this.$('ul.accordion').foundation('toggle', $('.accordion-content'))		
			item.save(()=>{
				Ember.get(this, 'flashMessages').success('Success!');
			});

		},
		create: function () {
			this.$('ul.accordion').foundation('toggle', $('.accordion-content'))	

      let data = this.getProperties("degree", "school", "location", "content", "from", "to");
			let work = this.store.createRecord('education', data);

			work.save().then(() => {
				Ember.get(this, 'flashMessages').success('Success!');
				Foundation.reInit($('ul.accordion'))
				this.setProperties({
					degree: null,
					school: null,
					location: null,
					content: null,
					from: null,
					to: null
				})
			})
		},
		delete: function(item){
			item.destroyRecord();
		}


	}
});
