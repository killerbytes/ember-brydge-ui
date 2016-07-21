import Ember from 'ember';

export default Ember.Mixin.create({
	defaults: {
		per_page: 5,
		page: 1,
		modelPath: 'controller.model'
	},
	page: 1,
	resetController(controller, isExiting, transition) {
      if (isExiting) {
        this.setProperties({
					page: 1,
					params: null,
				});
      }
  },

	brydgeScroller(model, params){
		if(model) this.set('modelName', model);
		var settings = {}
		var config = Ember.$.extend(settings, this.get('defaults'), params);
		if(params){
			this.set('params', config);
			this.set('page', this.get('page')+1);
		}else{
			config = this.get('params');
			config.page = this.get('page');
		}
		var _config = Ember.copy(config)
		delete _config.modelPath;
		return this.store.query(this.get('modelName'), _config).then(res=>{
			// this.set('page', this.get('page')+1);
			this.set('totalPage', res.get('meta.total_pages'));
			return res;
		})
	},
	actions: {
		load(){
			var infinityReached = this.get('page') > this.get('totalPage');
			if(this.get('controller.isLoading') || this.get('noMoreData') || infinityReached) return false;
			this.set('controller.isLoading', true);
			this.brydgeScroller().then(res=>{

				this.set('controller.isLoading', false);
				if(res.get('length') == 0) this.set('noMoreData', true);
				console.log
				this.get(this.get('params.modelPath')).pushObjects(res.content);
				this.set('page', this.get('page')+1);
			})
		},
	}

});
