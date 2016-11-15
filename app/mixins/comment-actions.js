import Ember from 'ember';

export default Ember.Mixin.create({
	perPage: 3, //set default
	page: 0, //set default
	actions:{
		submit(item) {
			this._submit(item);
		},
		hide(){
			this._hide();
		},
		show: function () {
			this._show();
		},
		resize(value, e){
			// e.currentTarget.style.height = '';
			if(value){
				var el = e.currentTarget;
				var offset = (el.offsetHeight - el.clientHeight);
				if(e.currentTarget.scrollHeight+offset > 30){
					e.currentTarget.style.height = 'auto';
					e.currentTarget.style.height = (e.currentTarget.scrollHeight+offset) + "px";
				}
			}
		}
	}
});
