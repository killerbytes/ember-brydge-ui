import Ember from 'ember';
import AjaxService from 'ember-ajax/services/ajax';
import QueryLocationMixin from 'web/mixins/query-locations';

export default Ember.Route.extend(QueryLocationMixin, {
  ajaxApi: Ember.inject.service('ajax-api'),
  model: function (params) {
    return Ember.RSVP.hash({
      categories: $.getJSON('data/categories.json')
    })
  },
	actions: {
		didTransition(){
			this.set('controller.search.key', null);
			this.set('controller.search.results', null);
		}
	}
});
