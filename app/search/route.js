import Ember from 'ember';
import AjaxService from 'ember-ajax/services/ajax';

export default Ember.Route.extend({
  resetController(controller, isExiting, transition) {
      if (isExiting) {
        controller.setProperties({
          name: undefined,
          keyword: undefined,
          city: undefined,
          results: undefined
        });
      }
  },
	actions: {
		didTransition(){
      this.set('controller.form.name', this.get('controller.name'));
      this.set('controller.form.keyword', this.get('controller.keyword'));
      this.set('controller.form.city', this.get('controller.city'));
      this.controller._buildQuery()
		}
	}
});
