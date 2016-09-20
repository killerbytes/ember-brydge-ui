import Ember from 'ember';

export default Ember.Component.extend({
	classNames: ['row', 'collapse', 'industry-item'],
	store: Ember.inject.service(),
	industryPicker: Ember.inject.service(),
	init(){
		this._super(...arguments);
		// this._setSelected();
	},
	posts: Ember.computed('profile', function(){
		// this.get('store').unloadAll('experience');
		return this.get('store').query('newsfeed',{filter: this.get('profile'), tab: 'profile'});
	}),
	onSelected: Ember.observer('selected','posts.length', function(){
		if(!this.get('selected')) return false;
		this.get('selected').forEach(i=>{
			var item = this.get('posts').findBy('id', i);
			if(item) item.set('active', true);
		})
	}),
	// _setSelected(){
	// 	// this.get('selected')
	// 	console.log(this.get('posts.length'));
	// },
	_load(id){
		this.get('store').findRecord('newsfeed', id).then(res=>{
			this.set('industryPicker.selected', res);
		})
	},
	actions: {
		select(item){
			this._load(item.id)

		}
	}
});
