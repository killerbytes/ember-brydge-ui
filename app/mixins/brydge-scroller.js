import Ember from 'ember';

export default Ember.Mixin.create({
	defaults: {
		per_page: 5,
		page: 1,
		modelPath: 'controller.model'
	},
	brydgeScroller(model, params){
		if(model) this.set('modelName', model);
		var settings = {}
		var config = Ember.$.extend(settings, this.get('defaults'), params);
		if(params){
			this.set('params', config);
			this.set('page', 1);
		}else{
			config = this.get('params');
			config.page = this.get('page');
		}
		var _config = Ember.copy(config)
		delete _config.modelPath;
		return this.store.query(this.get('modelName'), _config).then(res=>{
			this.set('page', this.get('page')+1);
			this.set('totalPage', res.get('meta.total_pages'));
			return res;
		})
	},
	actions: {
		load(){
			var infinityReached = this.get('page') > this.get('totalPage');
			console.log(this.get('controller.isLoading'), this.get('noMoreData'), infinityReached, this.get('page'), this.get('totalPage'))
			if(this.get('controller.isLoading') || this.get('noMoreData') || infinityReached) return false;
			this.set('controller.isLoading', true);
			this.brydgeScroller().then(res=>{
				this.set('controller.isLoading', false);
				this.get(this.get('params.modelPath')).pushObjects(res.content);
				if(res.get('length') == 0) this.set('noMoreData', true);
			})
		},
	}

});
