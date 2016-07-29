import Ember from 'ember';

export default Ember.Component.extend({
	classNames: ['accordion-form'],
	tagName: 'form',
	store: Ember.inject.service(),
	default: function(){
		return this.get('store').createRecord('language', {proficiency: "Beginner"});
	},
  languageProficiency: ["Beginner", "Intermediate", "Upper Intermediate", "Advanced", "Native or Bilingual"],
	list: Ember.computed.filterBy('items', 'isNew', false),
	item: Ember.computed(function(){
		return this.default();
	}),
	actions: {
		update: function(item, cb){
			item.save().then(()=>{
				cb.apply();
				this.$('ul.accordion').foundation('toggle', $('.accordion-content'));
			});
		},
		delete: function(item){
			item.destroyRecord();
		},
		create: function(item, cb){
			this.get('item').save()
			.then(res => {
				cb.apply();
				this.set('item', this.default());
				Ember.run.later(()=>{
					Foundation.reInit($('ul.accordion'));
					this.$('ul.accordion').foundation('toggle', $('.accordion-content'));					
				});
			})
		},
		clear(item){
			this.set('item', this.default());
		}
	}
});
