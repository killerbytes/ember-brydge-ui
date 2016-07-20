import Ember from 'ember';

export default Ember.Mixin.create({
	defaults: {
		per_page: 5,
		page: 1
	},
	currentPage: null,
	page: 1,
	brydgeScroller(model, params){
		if(model) this.set('modelName', model);
		var clonedObj = Ember.copy(params, true);
		var config = Ember.merge(this.get('defaults'), params);
		if(params){
			this.set('params', config);
		}else{
			config.page = this.get('page')+1;
		}
		return this.store.query(this.get('modelName'), config);
	},
	actions: {
		load(){
			var infinityReached = this.get('page') >= this.get('totalPage');
			var isPage = this.get('page') == this.get('currentPage');
			if( isPage || infinityReached ) return false;
			this.set('currentPage', this.get('page'));
			this.set('controller.isLoading', true)
			this.brydgeScroller().then(res=>{
				if(this.get('page') >= res.get('meta.total_pages')) return false;
				this.set('totalPage', res.get('meta.total_pages'));
				this.get('controller.model').pushObjects(res.content);
				this.set('page', this.get('page')+1);
				this.set('controller.isLoading', false)
			})
		},
	}

});
