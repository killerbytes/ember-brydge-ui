import Ember from 'ember';

export default Ember.Component.extend({
	sharePost: Ember.inject.service(),
	title: Ember.computed('model.title', function(){
		let title = this.get('model.title');
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
				this.set('value', null);
			});
		}
	}
});
