import Ember from 'ember';

export default Ember.Route.extend({
	model: function () {
		//return this.store.findAll('experience');
		return Ember.RSVP.hash({
	    educations: this.store.findAll('education'),
	    experiences: this.store.findAll('experience')
	  });
	}
});
