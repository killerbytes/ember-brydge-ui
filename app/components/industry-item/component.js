import Ember from 'ember';

export default Ember.Component.extend({
	classNames: ['row', 'collapse', 'industry-item', 'mb'],
	store: Ember.inject.service(),
	industryPicker: Ember.inject.service(),
	_setActive: Ember.observer('industryPicker.active', function(){
		var industry = this.get('groups').findBy('industryId', this.get('industryPicker.active.id'));
		var active = this.get('groups').findBy('active', true);
		if(active) active.set('active', false);
		if(industry) industry.set('active', true);
  }),
	_setSelected: Ember.observer('industryPicker.industries.length', function(){
		this.get('industryPicker.industries').forEach(i=>{
			var industry = this.get('groups').findBy('industryId', i.id);
			if(industry) industry.set('selected', true);
		})
	}),
	groups: Ember.computed('item', function(){
		return this.get('store').query('industry',{category: this.get('item.id')});
	}),
	onSelected: Ember.observer('selected','posts.length', function(){
		if(!this.get('selected')) return false;
		this.get('selected').forEach(i=>{
			var item = this.get('posts').findBy('id', i);
			if(item) item.set('active', true);
		})
	}),
	_load(item){
		this.get('store').queryRecord('industry', {category: item.get('groupId'), id: item.get('industryId')}).then(res=>{
			this.set('industryPicker.active', res);
		})
	},
	actions: {
		select(item){
			this._load(item);
		}
	}
});
