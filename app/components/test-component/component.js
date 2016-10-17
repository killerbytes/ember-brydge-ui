import Ember from 'ember';
import _ from 'lodash/lodash';

export default Ember.Component.extend( {
	store: Ember.inject.service(),
	ajax: Ember.inject.service(),
	session: Ember.inject.service(),
	sessionAccount: Ember.inject.service(),
	tagName: 'form',
	_default: function(){
		return this.get('store').createRecord('experience', {startFrom: new Date(), endAt: new Date()});
	},
	item: Ember.computed(function(){
		return this._default();
	})
});
