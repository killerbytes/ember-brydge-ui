import Ember from 'ember';

export default Ember.Route.extend({
	ajax: Ember.inject.service(),
	model(){
		// return this.store.query('experience',{userid: '2zd33na16gv'})
		// return this.get('ajax').request('v1/profiles/2zd33na16gv');
	},
	setupController(){
		// this.store.findRecord('profile', '2zd33na16gv').then(res=>{
		// 	console.log(res, res.get('firstName'))
		// })

		this.get('ajax').request('v1/profiles/2zd33na16gv').then(res=>{
			// console.log(res.data.attributes)
			var xx = this.store.createRecord('profile', res.data.attributes)
			console.log(xx)

			console.log(xx.get('firstName'))
		})


	}
});
