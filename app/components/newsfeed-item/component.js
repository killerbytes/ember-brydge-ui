import Ember from 'ember';

export default Ember.Component.extend({
	ajax: Ember.inject.service(),
	classNames: ['newsfeed-item', 'box', 'rounded'],
	menuName: Ember.computed('post.id', function(){
		return "dd-post-menu-" + this.get('post.id');
	}),
	title: Ember.computed('post.title', function(){
		let title = this.get('post.title');
		return title.length > 100 ? title.substr(0, 100) + ' ...' : title;
		// return "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non";
	}),
	actions: {
		focusInput(){
			this.$('input').focus()
		},
		vote(){

			console.log('newsfeed-item', this.get('ajax').request('/v1/posts/0z931mwmhde/up'));

		}
	}
});
