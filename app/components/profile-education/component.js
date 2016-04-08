import Ember from 'ember';

export default Ember.Component.extend({
	classNames: ['profile-accordion', 'no-bullet'],
	actions: {
		update: function (item) {
			this.$('ul.accordion').foundation('toggle', $('.accordion-content'))		
			item.save(()=>{
				console.log('successfully updated')				
			});

		},
		create: function () {
			this.$('ul.accordion').foundation('toggle', $('.accordion-content'))	

      let data = this.getProperties("degree", "school", "location", "content", "from", "to");
			let work = this.store.createRecord('education', data);

			work.save().then(() => {
				console.log('saved successfully');
			})
		},
		delete: function(item){
			item.destroyRecord();
		}


	}
});
