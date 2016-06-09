import Ember from 'ember';

export default Ember.Component.extend({
	// routing: Ember.inject.service('-routing'),
	search: Ember.inject.service(),
	ajax: Ember.inject.service(),
	classNames: ['top-bar-group', 'top-bar-search', 'rounded'],
	timer: 123,
	didUpdateAttrs(){
		console.log('didUpdateAttrs')
		this._super(...arguments)
	},
		init(){
		this._super(...arguments)
			console.log('init')
		},
		didInsertElement(){
		this._super(...arguments)
			console.log('didInsertElement')
		},
	actions: {
		onSelect(){
			console.log('onSelect')
		},
		clear(){
			this.set('search.key', null);
		},
		search(q){
			let shouldDropdown = this.get('search.shouldDropdown');

			if(q && shouldDropdown){
				this.$('#dd-search').foundation('open');
			}else{
				this.$('#dd-search').foundation('close');	      		
			}

			if(q.length < 2) return false;

			var delay = (()=>{
				return (callback, ms)=>{
					clearTimeout(this.get('timer'));
					this.set('timer', setTimeout(callback, ms))
				};
			})();

			delay(()=>{
				this.get('search').query({
					q: q + "*",
					type: 'profile'
				})				
			}, 500)



			// this.store.findAll('search', {query: q});
			// return false;
			// if(q.length > 0){
			//     this.get('ajax').request('search/profile/'+ q).then((res)=>{
			//     	this.setProperties(res.response);
			//     });
			// }else{
			//    	this.set('docs', []);
			// }
		}
	},

});
