import Ember from 'ember';

export default Ember.Component.extend({
	classNames: ['media', 'box'],
	title: Ember.computed('model.title', function(){
		let title = this.get('model.title') || '';
		return title.length > 100 ? title.substr(0, 100) + ' ...' : title;
		// return "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non";
	}),
});
