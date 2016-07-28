import Ember from 'ember';

export default Ember.Component.extend({
	classNames: ['accordion-form'],
	tagName: 'form',
	store: Ember.inject.service(),
  languageProficiency: ["Beginner", "Intermediate", "Upper Intermediate", "Advanced", "Native or Bilingual"],
	model: Ember.computed(function(){
		return this.get('store').createRecord('language', {proficiency: "Beginner"});
	}),
	list: Ember.computed.filterBy('items', 'isNew', false),
	item: Ember.computed(function(){
		return this.get('store').createRecord('language');
	}),
	actions: {
		update: function(item){
			this.$('ul.accordion').foundation('toggle', $('.accordion-content'))
			item.save().then(()=>{
				Ember.get(this, 'flashMessages').success('Success!');
			});
		},
		delete: function(item){
			item.destroyRecord();
		},
		create: function(){
			this.get('item').save()
			.then(res => {
				Ember.run.later(()=>{
					Foundation.reInit($('ul.accordion'));
					this.set('item', this.get('store').createRecord('language'));
				});
			})
		}
	}
});
