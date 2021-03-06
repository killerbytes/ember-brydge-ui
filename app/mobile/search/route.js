import Ember from 'ember';
import BrydgeScroller from 'web/mixins/brydge-scroller';
import RouterClassNamesMixins from 'web/mixins/route-class-names';
const {
  Component,
  computed,
  getOwner
} = Ember;

export default Ember.Route.extend(
  RouterClassNamesMixins,
  BrydgeScroller, {
  className: 'search',
  resetController(controller, isExiting, transition) {
      if (isExiting) {
        getOwner(this).lookup('controller:application').set('classNames', null);
        controller.setProperties({
          name: undefined,
          keyword: undefined,
          city: undefined,
          results: undefined
        });

      }
      return true;
  },
  beforeModel(transition){
    if(!this.get('detector.isMobile')) this.transitionTo('search');
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
		// didTransition(){
    //   // this.set('controller.form.name', this.get('controller.name') || undefined);
    //   // this.set('controller.form.keyword', this.get('controller.keyword'));
    //   // this.set('controller.form.city', this.get('controller.city'));
    //   return true;
		// },
    refresh: function(){
      this.set('controller.name', this.get('controller.form.name'));
      this.set('controller.keyword', this.get('controller.form.keyword'));
      this.set('controller.city', this.get('controller.form.city'));
      this.refresh();
    }

	}
});
