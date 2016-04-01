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
			this.$('.form-accordion').foundation('toggle', $('.accordion-content'))
			let work = this.store.createRecord('experience',{
				company: this.get('company'),
				title: this.get('title'),
				location: this.get('location'),
				content: this.get('content'),
				from: this.get('from'),
				to: this.get('to'),
				currentCompany: this.get('currentCompany')
			});

			work.save().then(() => {
				console.log('saved successfully');
				this.set('isNewWork', false);

			})
		}
	}
});
