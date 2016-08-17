import Ember from 'ember';

export default Ember.Mixin.create({
	defaults: {
		per_page: 5,
		page: 1,
		modelPath: 'controller.model'
	},
	scroller: {},
	brydgeScroller(model, params, el){
		if(model) this.set('modelName', model);
		var settings = {}
		var config = Ember.$.extend(settings, this.get('defaults'), params);
		if(params){
			if(!this.get(params.scroller)) this.set(params.scroller, {});
			this.set(params.scroller + '.params', config);
			this.set(params.scroller + '.page', 1);
			this.set(params.scroller + '.noMoreData', false);
		}else{
			config = this.get(el+'.params');
			config.page = this.get(el+'.page');
		}
		var _config = Ember.copy(config)
		delete _config.modelPath;
		var id = params && params.scroller || el;
		return this.store.query(this.get('modelName'), _config).then(res=>{
			this.set(id + '.page', this.get(id+'.page')+1);
			this.set(id + '.totalPage', res.get('meta.total_pages'));
			return res;
		})
	},
	actions: {
		load(el){
			var infinityReached = this.get(el+'.page') > this.get(el+'.totalPage');
			if(this.get('controller.isLoading') || this.get(el+'.noMoreData') || infinityReached) return false;
			this.set('controller.isLoading', true);
			this.brydgeScroller(null, null, el).then(res=>{
				this.set('controller.isLoading', false);
				if(this.get(this.get(el+'.params.modelPath'))) this.get(this.get(el+'.params.modelPath')).pushObjects(res.content);
				if(res.get('length') == 0) this.set(el+'.noMoreData', true);
			})
		},
	}

});
