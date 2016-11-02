import Ember from 'ember';

export default Ember.Component.extend({
	willDestroyElement(){
		$('body').removeClass('is-reveal-open');
		this._super(...arguments);
	}
});
