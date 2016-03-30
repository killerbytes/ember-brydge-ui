import Ember from 'ember';

export default Ember.Component.extend({
	ajax: Ember.inject.service(),
	classNames: ['newsfeed-item', 'box', 'rounded'],
	actions: {
		vote(){

			console.log('newsfeed-item', this.get('ajax').request('/v1/posts/0z931mwmhde/up'));

		}
	}
});
