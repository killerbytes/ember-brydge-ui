import Ember from 'ember';
import Validations from '../../models/validations/experience';

export default Ember.Component.extend(Validations, {
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

      let data = this.getProperties("company", "title", "location", "content", "from", "to", "currentCompany");
			let work = this.store.createRecord('experience', data);

			work.save().then(() => {
				Ember.get(this, 'flashMessages').success('Success!');
				Foundation.reInit($('ul.accordion'))
				this.setProperties({
					company: null,
					title: null,
					location: null,
					content: null,
					from: null,
					to: null,
					currentCompany: null
				})
			})
		},
		delete: function(item){
			item.destroyRecord();
		}


	}
});