import Ember from 'ember';

export default Ember.Component.extend({
	ajax: Ember.inject.service(),
	classNames: ['newsfeed-item', 'box', 'rounded'],
	menuName: Ember.computed('post.id', function(){
		return "dd-post-menu-" + this.get('post.id');
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
