import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
const {
  Component,
  computed,
  getOwner
} = Ember;


export default Ember.Route.extend(AuthenticatedRouteMixin, {
	store: Ember.inject.service(),
	model: function () {
		this.store.unloadAll('conversation');
		return this.store.findAll('conversation');
	},
	_onResize(){
    // console.log('resize')
		var height = Ember.$('.box').height();
    Ember.$('.conversation-list').height((height - Ember.$('.conversation-list').siblings('.pane-header').outerHeight()) + 'px');
    Ember.$('.contact-list').height((height - Ember.$('.contact-list').siblings('.pane-header').outerHeight()) + 'px');



	},
  resetController(controller, isExiting, transition) {
      if (isExiting) {
        getOwner(this).lookup('controller:application').set('classNames', '');
      }
  },

	actions: {
		didTransition(){
			getOwner(this).lookup('controller:application').set('classNames', 'messaging');
			var height = 0;
			Ember.run.scheduleOnce('afterRender', this, ()=>{
				// Ember.$('.conversations > .columns').each((index, elem)=>{
				// 	if(elem.getBoundingClientRect().height > 0){
				// 		height = elem.clientHeight;
				// 	}
				// })
				// Ember.$('.conversations > .columns').each((index, elem)=>{
				// 	elem.style.height = height + "px";
				// })
        window.addEventListener('resize', ()=>{
  				Ember.run.debounce(this, this._onResize, 500);
  			})

				this._onResize();

			})
			return true;
		}
	}
});
