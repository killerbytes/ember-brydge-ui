import Ember from 'ember';

export default Ember.Component.extend({
	classNames: ['row', 'collapse', 'industry-item', 'mb'],
	store: Ember.inject.service(),
	industryPicker: Ember.inject.service(),
	_setSelected: Ember.observer('industryPicker.industries.length', function(){
		this.get('industryPicker.industries').forEach(i=>{
			var industry = this.get('groups').findBy('industryId', i);
			industry.set('selected', true)
		})
		// this.get('industryPicker.industries');
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
		// console.log(item.set('active', true))
		this.get('store').queryRecord('industry', {category: item.get('groupId'), id: item.get('industryId')}).then(res=>{
			this.set('industryPicker.selected', res);
		})
	},
	actions: {
		select(item){
			this.sendAction("reset");
			this._load(item);

		}
	}
});
