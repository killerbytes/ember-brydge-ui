import Ember from 'ember';

export default Ember.Component.extend({
	classNames: ['brydge-form'],
	tagName: 'form',
	routing: Ember.inject.service(),
	location: null,
	actions: {
    submit(cb) {
			var params = {
				name: this.get('name'),
				keyword: this.get('keyword'),
				location: this.get('location')
			}
			if(!params['location']) params['location'] = undefined;
			this.setProperties({
				name: undefined,
				keyword: undefined,
				location: undefined
			})
			this.get('routing').transitionTo('search', {queryParams: params});
    }
	}
});
