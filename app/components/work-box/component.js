import Ember from 'ember';

export default Ember.Component.extend({
	actions: {
		saveWork: function(work) {
      console.log(work.company);
		}
	}
});
