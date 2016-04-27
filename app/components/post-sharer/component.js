import Ember from 'ember';

export default Ember.Component.extend({
	sharePost: Ember.inject.service(),
	actions: {
		checkboxChanged(value, checked){
			// console.log('checkboxChange', arguments)
			if(checked){
				this.get('sharePost.categories').push(value);

			}else{
				var categories = this.get('sharePost.categories');
				_.remove(categories, function(i){
					return i == value;
				})
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
