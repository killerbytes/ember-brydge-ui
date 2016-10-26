import Ember from 'ember';

export default Ember.Component.extend({
	search: Ember.inject.service(),
	ajax: Ember.inject.service(),
	classNames: ['top-bar-search', 'wrapper', 'hide-for-small-only'],
	actions: {
		clear(){
			this.set('search.key', null);
		},
		search(q){
			// let shouldDropdown = this.get('search.shouldDropdown');

			if(q){
				this.$('#dd-search').foundation('open');
			}else{
				this.$('#dd-search').foundation('close');
			}

			if(q.length < 2) return false;
			this.set('search.results', []);
			this.set('search.isLoading', true);
			var delay = (()=>{
				return (callback, ms)=>{
					clearTimeout(this.get('timer'));
					this.set('timer', setTimeout(callback, ms))
				};
			})();

			delay(()=>{
				this.get('search').query({
					q: q,
					type: 'profile'
				})
			}, 500)
		}
	},

});
