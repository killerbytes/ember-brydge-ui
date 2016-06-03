import Ember from 'ember';

export default Ember.Controller.extend({
  sortProps: ['updatedAt:desc'],
	items: Ember.computed.sort('model', 'sortProps'),
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
		}

	}
});
