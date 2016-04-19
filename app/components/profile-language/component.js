import Ember from 'ember';

export default Ember.Component.extend({
	flashMessages: Ember.inject.service(),
	classNames: ['profile-accordion', 'no-bullet'],
  selected: null,
  languageProficiency: ["Beginner", "Intermediate", "Upper Intermediate", "Advanced", "Native or Bilingual"],
	actions: {
		select: function(item){
			this.set('selected', item);
		},
		update: function(item){
			this.$('ul.accordion').foundation('toggle', $('.accordion-content'))		
			item.save(()=>{
				Ember.get(this, 'flashMessages').success('Success!');
			});

		},
		delete: function(item){
			item.destroyRecord();

		},
		create: function(){
			let form = this.getProperties("name", "proficiency");
			let language = this.store.createRecord('language', form);

			language.save().then((res) => {
				// this.store.push(res)

				Ember.get(this, 'flashMessages').success('Success!');
				Foundation.reInit($('ul.accordion'))
				this.setProperties({
					name: null,
					proficiency: null
				})
			})

		}
	},

	// actions: {
		// update: function (item) {
		// 	this.$('ul.accordion').foundation('toggle', $('.accordion-content'))		
		// 	item.save(()=>{
		// 		Ember.get(this, 'flashMessages').success('Success!');
		// 	});

		// },
		// create: function () {
		// 	this.$('ul.accordion').foundation('toggle', $('.accordion-content'))	

  //     let data = this.getProperties("degree", "school", "location", "content", "from", "to");
		// 	let work = this.store.createRecord('education', data);

		// 	work.save().then(() => {
		// 		Ember.get(this, 'flashMessages').success('Success!');
		// 		Foundation.reInit($('ul.accordion'))
		// 		this.setProperties({
		// 			degree: null,
		// 			school: null,
		// 			location: null,
		// 			content: null,
		// 			from: null,
		// 			to: null
		// 		})
		// 	})
		// },
		// delete: function(item){
		// 	item.destroyRecord();
		// }
	// }
});
