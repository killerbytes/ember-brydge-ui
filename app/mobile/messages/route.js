import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import RouterClassNamesMixins from 'web/mixins/route-class-names';

export default Ember.Route.extend(
  RouterClassNamesMixins,
  AuthenticatedRouteMixin, {
	store: Ember.inject.service(),
  className: 'main-mobile',
  beforeModel(transition){
    if(!this.get('detector.isMobile')) this.transitionTo('messages');
  },
	model: function () {
		this.store.unloadAll('conversation');
		return this.store.findAll('conversation');
	},
	_onResize(){
		var height = Ember.$('.box').height();
    Ember.$('.conversation-list').height((height - Ember.$('.conversation-list').siblings('.pane-header').outerHeight()) + 'px');
    Ember.$('.contact-list').height((height - Ember.$('.contact-list').siblings('.pane-header').outerHeight()) + 'px');



	},
});
