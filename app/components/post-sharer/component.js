import Ember from 'ember';

export default Ember.Component.extend({
	sharePost: Ember.inject.service(),
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
			});
		}
	}
});
