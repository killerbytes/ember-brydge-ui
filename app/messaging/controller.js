import Ember from 'ember';

export default Ember.Controller.extend({
	conversations: Ember.computed('model.@each','key', function(){		
		let query = this.get('key');
		return this.get('model').filter(function(item){
			if(!item.get('other.name')) return true;
			return item.get('other.name').toLowerCase().indexOf(query) >= 0 ? true : false ;
		})
	})
});
