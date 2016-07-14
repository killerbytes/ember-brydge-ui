import Ember from 'ember';

export default Ember.Controller.extend({
  sortProps: ['updatedAt:desc'],
  sortFrom: ['from:desc'],
  queryParams: ['tab', 'channels', 'q', 'location'],
  channels: null,
  location: null,
  myfavs: Ember.computed.map('model.favorites', function(i){
  	return {
  		code: i.get('code'),
  		name: i.get('name')
  	};
  }),
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
		invite(){
			this.store.createRecord('invitation', {
				email: "heinzeya@gmail.com"
			}).save();
		},
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

	}
});
