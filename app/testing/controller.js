import Ember from 'ember';

export default Ember.Controller.extend({
  sortProps: ['updatedAt:desc'],
  sortFrom: ['from:desc'],
	items: Ember.computed.sort('model', 'sortFrom'),
	experiences: Ember.computed('model', function(){
		var exp = this.get('items').toArray();
		// console.log(exp)
		return _.sortBy(exp, 'currentCompany', function(i){
			return !i.get('currentCompany');
		});
	}),
	myLocation: Ember.computed('myLocation', function(){
		return "azidburn";
	}),
	actions: {
		resize(value, e){
			// console.log(value)
			if(value){
				var el = e.currentTarget;
				var offset = (el.offsetHeight - el.clientHeight)+2;
				e.currentTarget.style.height = 'auto';
				e.currentTarget.style.height = (e.currentTarget.scrollHeight+offset) + "px";
			}else{
				e.currentTarget.style.height = 'auto';
				console.log(e.currentTarget.style.height)
			}
		},
		onLocationSelect(item, cb){
			this.set('myLocation', item);
		}

	}
});
