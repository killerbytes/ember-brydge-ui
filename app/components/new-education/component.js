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
			console.log('cancel new education << Component');
			this.set('isNewEducation', false);
		},

		save: function () {
			let education = this.store.createRecord('education',{
				school: this.get('school'),
				degree: this.get('degree'),
				field: this.get('field'),
				description: this.get('description'),
				from: this.get('from'),
				to: this.get('to')
			});

			education.save().then(() => {
				console.log('saved successfully');
			})
		}
	}
});
