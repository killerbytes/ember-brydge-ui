import Ember from 'ember';

export default Ember.Component.extend({
	classNames: ['brydge-form', 'row', 'search-box'],
	tagName: 'form',
	routing: Ember.inject.service(),
	city: null,
	actions: {
    submit(cb) {
			var params = {
				name: this.get('name'),
				keyword: this.get('keyword'),
				city: this.get('city')
			}
			if(!params['city']) params['city'] = undefined;
			this.setProperties({
				name: undefined,
				keyword: undefined,
				city: undefined
			})
			this.get('routing').transitionTo('search', {queryParams: params});
    }
	}
});
