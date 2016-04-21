import Ember from 'ember';
import GeoChannelFilterMixin from 'web/mixins/geo-channel-filter';

export default Ember.Route.extend({
  session: Ember.inject.service('session'),
	model: function() {
		let userid = this.get('session.data.authenticated.user_id');
    console.log('userid =>', userid);
  	return Ember.RSVP.hash({
  		profile: this.store.findRecord('profile', userid)
  	});
	},
  actions: {
    select: function(item) {
      console.log('router => select', item);
      this.refresh();
    }
  }
});