import Ember from 'ember';
import _ from 'lodash/lodash';

export default Ember.Component.extend( {
	store: Ember.inject.service(),
	session: Ember.inject.service(),
	classNames: ['recommendation-box', 'box'],
	classNameBindings: ['isEmpty:hide'],
	list: null,
	isEmpty: Ember.computed.empty('list'),
	init(){
		this._super(...arguments);
		this.set('list', this.get('store').query('recommendation', {id: this.get('session.data.authenticated.user_id')}));
	}
});
