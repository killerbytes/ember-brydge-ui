import Ember from 'ember';

export default Ember.Controller.extend({
	notification: Ember.inject.service(),

  selected: null,
	actions: {
		test: function(){
			this.get('notification').requestConnections();
		},
		// select: function(item){
		// 	this.set('selected', item);
		// },
		save: function(){
			console.log('save', this.get('model').save());

		},
		// delete: function(){
		// 	console.log('delete', this.get('selected').destroyRecord());

		// },
		// create: function(){
		// 	let form = this.getProperties("name", "proficiency");
		// 	let language = this.store.createRecord('language', form);

		// 	this.store.push
		// 	language.save().then((res) => {
		// 		this.store.push(res)
		// 		this.setProperties({
		// 			name: null,
		// 			proficiency: null
		// 		})
		// 	})

		// }
	}
  
});
