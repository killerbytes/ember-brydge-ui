import Ember from 'ember';

export default Ember.Component.extend({
	flashMessages: Ember.inject.service(),
	classNames: ['profile-accordion', 'no-bullet'],
  selected: null,
	actions: {
		select: function(item){
			this.set('selected', item);
		},
		update: function(item){
			this.$('ul.accordion').foundation('toggle', $('.accordion-content'))		
			item.save(()=>{
				Ember.get(this, 'flashMessages').success('Success!');
			});
		},
		delete: function(item){
			item.destroyRecord();
		},
		create: function(){
			let form = this.getProperties("content");
			let interest = this.store.createRecord('interest', form);

			interest.save().then((res) => {
				Ember.get(this, 'flashMessages').success('Success!');
				Foundation.reInit($('ul.accordion'))
				this.setProperties({
					content: null
				})
			})

		}
	}
});
