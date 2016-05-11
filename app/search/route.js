import Ember from 'ember';
import AjaxService from 'ember-ajax/services/ajax';
import QueryLocationMixin from 'web/mixins/query-locations';

export default Ember.Route.extend(QueryLocationMixin, {
  ajaxApi: Ember.inject.service('ajax-api'),
  model: function (params) {    
    return Ember.RSVP.hash({
      categories: this.get('ajaxApi').request('categories/menu')
    })
  },
 //  afterModel(model){
	// 	var x = _.chain(_.map(model.categories, 'categories'))
	// 							.flatten()
	// 							.map((i)=>{
	// 								return i.industries;
	// 							})
	// 							.flatten()
	// 							.filter((d)=>{
	// 								return d.data.code == "30501";
	// 							})
	// 							.first()
	// 							.value()
	// 	Ember.set(x, 'data.checked', true)
	// 	console.log(model.categories)


	// },
	actions: {
		openLocationModal: function(){	
			console.log('openModal');
		}
	}
});
