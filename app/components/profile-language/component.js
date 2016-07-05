import Ember from 'ember';

export default Ember.Component.extend({
	classNames: ['accordion-form'],
	tagName: 'form',
	store: Ember.inject.service(),
  languageProficiency: ["Beginner", "Intermediate", "Upper Intermediate", "Advanced", "Native or Bilingual"],
	model: Ember.computed(function(){
		return this.get('store').createRecord('language');
	}),
	list: Ember.computed.filterBy('items', 'isNew', false),
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
			let language = this.get('store').createRecord('language', this.get('model'));
			language.save().then((res) => {
				Ember.get(this, 'flashMessages').success('Success!');
				Foundation.reInit($('ul.accordion'));
			})
		}
	}
});
