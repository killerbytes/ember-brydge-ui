import Ember from 'ember';

export default Ember.Component.extend({
	willDestroyElement(){
		$('body, html').removeClass('is-reveal-open');
		this._super(...arguments);
	}
});
