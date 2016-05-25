import Ember from 'ember';

export default Ember.Component.extend({
	sharePost: Ember.inject.service(),
	title: Ember.computed('post.title', function(){
		let title = this.get('post.title');
		if(!title) return false;
		return title.length > 100 ? title.substr(0, 100) + ' ...' : title;
	}),
	sharedTitle: Ember.computed('post.sharedPost.title', function(){
		let title = this.get('post.sharedPost.title');
		if(!title) return false;
		return title.length > 100 ? title.substr(0, 100) + ' ...' : title;
	}),
	actions: {
		checkboxChanged(value, checked, name){

			if(checked){
				this.get('sharePost.categories').pushObject({id: value, text: name });
			}else{
				var categories = this.get('sharePost.categories').toArray();
				_.remove(categories, {id: value})
				this.set('sharePost.categories', categories)
			}
		},
		sharePost(){
			this.sendAction('submit', ()=>{
				this.$('#shareModal').foundation('close');
				this.set('value', '');
				this.set('sharePost.categories', [])
			});
		}
	}
});
