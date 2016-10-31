import Ember from 'ember';
import AjaxService from 'ember-ajax/services/ajax';
import BrydgeScroller from 'web/mixins/brydge-scroller';

export default Ember.Route.extend(BrydgeScroller, {
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
  model(params){
    // if(!params.name && !params.keyword && !params.city) return false;
    // return this._super(...arguments);
    return Ember.RSVP.hash({
      search: this.brydgeScroller('search',{
        scroller: 'search',
        q: params.name,
        keyword: params.keyword,
        city: params.city,
        modelPath: 'controller.model.search'
      })
    })
    // return this.store.query('search', {q: params.name, keyword: params.keyword, city: params.city});
  },
	actions: {
		didTransition(){
      this.set('controller.form.name', this.get('controller.name') || undefined);
      this.set('controller.form.keyword', this.get('controller.keyword'));
      this.set('controller.form.city', this.get('controller.city'));
      console.log(this)
      // this.controller._buildQuery()
      // console.log('didTransition')
      // this.refresh();
		},
    refresh: function(){
      this.set('controller.name', this.get('controller.form.name'));
      this.set('controller.keyword', this.get('controller.form.keyword'));
      this.set('controller.city', this.get('controller.form.city'));
      // console.log(this.get('controller.model').reload())
      this.refresh();
    }

	}
});
