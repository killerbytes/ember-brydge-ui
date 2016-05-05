import Ember from 'ember';

export default Ember.Component.extend({
	notification: Ember.inject.service(),
	tagName: 'li'
});
