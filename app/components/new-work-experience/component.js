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
		new: function(){
			let work = this.store.createRecord('experience',{});
			this.set('form', work)
		},
		update: function () {
			console.log('work => save', this);
			return false;
			
			let work = this.get('form');
			// let workToUpdate = this.store.peekRecord('experience', '0zlvyfmnmty');
			// console.log(workToUpdate.get('company'))
			// workToUpdate.set('company','edited company');
			work.save(()=>{
				console.log('successfully updated')
			});

			// let workToDelete = this.store.peekRecord('experience', '0zocti4smyz');
			// console.log(workToDelete.get('company'))
			// workToDelete.deleteRecord();
			// workToDelete.save(()=>{
			// 	console.log('successfully saved');
			// })
		},

		create: function () {
			this.$('.form-accordion').foundation('toggle', $('.accordion-content'))		
			console.log(this.getProperties(), this)
			return false;	
			let work = this.store.createRecord('experience',{
				company: this.get('form.company'),
				title: this.get('form.title'),
				location: this.get('form.location'),
				content: this.get('form.content'),
				from: this.get('form.from'),
				to: this.get('form.to'),
				currentCompany: this.get('form.currentCompany')
			});
			// let work = this.get('form');

			work.save().then(() => {
				console.log('saved successfully');
				this.set('isNewWork', false);

			})
		}
	}
});
