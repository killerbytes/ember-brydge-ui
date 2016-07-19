import Ember from 'ember';
import InfinityRoute from "ember-infinity/mixins/route";

export default Ember.Route.extend(InfinityRoute, {
	ajax: Ember.inject.service(),
	// queryParams: {
	// 	per_page: {
	// 		refreshModel: true
	// 	},
	// 	limit: {
	// 		refreshModel: true
	// 	}
	// },
	model(params){
		console.log(params)
		var userid = '2zd33na16gv';
		return this.store.query('message', {
			id: "adc73f9c4a4511e6a648acbc32b17109",
			per_page: 3,
			page: 1
		});
	},
	actions: {
    load(){
			this.set('controller.page', this.get('controller.page')+1)
			var userid = '2zd33na16gv';
	    this.store.query('ask', {
	      from: userid,
	      status: 'pending',
	      per_page: 3,
	      page: this.get('controller.page')
	    }).then(res=>{
	      this.get('controller.model').pushObjects(res.content)
	    })

    }
  }
});
