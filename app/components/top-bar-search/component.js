import Ember from 'ember';

export default Ember.Component.extend({
	routing: Ember.inject.service('-routing'),
	search: Ember.inject.service(),
	ajax: Ember.inject.service(),
	classNames: ['top-bar-group', 'top-bar-search', 'rounded'],
	actions: {
		search: function(q){
			let shouldDropdown = this.get('search.shouldDropdown');
			if(q.length < 3) return false;
			this.get('search').query(q);

			// this.store.findAll('search', {query: q});
			// return false;
			// if(q.length > 0){
			//     this.get('ajax').request('search/profile/'+ q).then((res)=>{
			//     	this.setProperties(res.response);
			    	if(shouldDropdown){
			     	this.$('#dd-search').foundation('open');
			    	}else{
			     	this.$('#dd-search').foundation('close');	      		
			    	}
			//     });
			// }else{
			//    	this.set('docs', []);
			// }
		}
	}
});
