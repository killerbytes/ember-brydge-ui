import Ember from 'ember';

export default Ember.Route.extend({
	store: Ember.inject.service(),
	model: function () {
		this.store.unloadAll('conversation');
		return this.store.findAll('conversation');
	},
	actions: {
		didTransition(){
			var height = 0;
			Ember.run.scheduleOnce('afterRender', this, ()=>{
				Ember.$('.conversations > .columns').each((index, elem)=>{
					if(elem.getBoundingClientRect().height > 0){
						height = elem.clientHeight;
					}
				})
				Ember.$('.conversations > .columns').each((index, elem)=>{
					elem.style.height = height + "px";
				})
			})
			return true;
		}
	}
});
