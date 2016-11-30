import Ember from 'ember';
import _ from 'lodash/lodash';

export default Ember.Component.extend( {
	store: Ember.inject.service(),
	session: Ember.inject.service(),
	list: [],
	init(){
		this._super(...arguments);
		// this.set('list', this.get('store').query('recommendation', {id: this.get('session.data.authenticated.user_id')}));
		this.set('list', this.get('store').query('recommendation', {id: "111dreytmo0z"}))

	}
});
