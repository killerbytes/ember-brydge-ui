import Ember from 'ember';

export default Ember.Component.extend({
	fromChanged: function () { 
		console.log('from date changed =>', this.get('from'));
	}.observes('from'),

	fromChanged: function () { 
		console.log('to date changed =>', this.get('to'));
	}.observes('to'),

	actions: {
		cancel: function () {
			console.log('cancel new experience << Component');
			this.set('isNewWork', false);
		},

		save: function () {
			console.log('work => save');
			
			// let workToUpdate = this.store.peekRecord('experience', '0zlvyfmnmty');
			// console.log(workToUpdate.get('company'))
			// workToUpdate.set('company','edited company');
			// workToUpdate.save(()=>{
			// 	console.log('successfully updated')
			// });

			let workToDelete = this.store.peekRecord('experience', '6zm0kb53dji');
			console.log(workToDelete.get('company'))
			workToDelete.deleteRecord();
			workToDelete.save(()=>{
				console.log('successfully saved');
			})
		}

		// save: function () {
		// 	// this.$('.form-accordion').foundation('toggle', $('.accordion-content'))			
		// 	// let work = this.get('form');
		// 	let work = this.store.findRecord('experience', this.get('form.id'));
		// 	// work.destroyRecord();
		// 	// work.save();
		// 	console.log(work)

		// 	return false;
		// 	// let work = this.store.createRecord('experience',{
		// 	// 	company: this.get('company'),
		// 	// 	title: this.get('title'),
		// 	// 	location: this.get('location'),
		// 	// 	content: this.get('content'),
		// 	// 	from: this.get('from'),
		// 	// 	to: this.get('to'),
		// 	// 	currentCompany: this.get('currentCompany')
		// 	// });

		// 	// work.save().then(() => {
		// 	// 	console.log('saved successfully');
		// 	// 	this.set('isNewWork', false);

		// 	// })
		// }
	}
});
