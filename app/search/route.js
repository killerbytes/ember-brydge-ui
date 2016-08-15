import Ember from 'ember';
import AjaxService from 'ember-ajax/services/ajax';
import QueryLocationMixin from 'web/mixins/query-locations';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(
  AuthenticatedRouteMixin,
  QueryLocationMixin, {
  ajaxApi: Ember.inject.service('ajax-api'),
  resetController(controller, isExiting, transition) {
      if (isExiting) {
        controller.setProperties({
          key: '',
          industry: '',
          location: '',
        });
      }
  },
  model: function (params) {
    return Ember.RSVP.hash({
      categories: this.get('ajaxApi').request('/v2/categories/menu')
    })
  },
	actions: {
		didTransition(){
      this.set('controller.results', []);
      this.controller._query()
			// this.set('controller.search.key', null);
			// this.set('controller.search.results', null);
		}
	}
});
