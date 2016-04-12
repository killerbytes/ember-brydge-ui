import Ember from 'ember';

export default Ember.Component.extend({
	ajax: Ember.inject.service(),
	classNames: ['top-bar-group', 'top-bar-search', 'rounded'],
	actions: {
		search: function(q){
			if(q.length > 0){
	      this.get('ajax').request('search/profile/'+ q).then((res)=>{
	      	this.setProperties(res.response);
	      	if(q.length > 1){
		      	this.$('#dd-search').foundation('open');
	      	}else{
		      	this.$('#dd-search').foundation('close');	      		
	      	}
	      });
			}else{
      	this.set('docs', []);
			}
		}
	}
});
