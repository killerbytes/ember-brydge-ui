import Ember from 'ember';
import Validations from '../../models/validations/language';

export default Ember.Component.extend(Validations, {
	classNames: ['profile-accordion', 'no-bullet'],
	store: Ember.inject.service(),
  languageProficiency: ["Beginner", "Intermediate", "Upper Intermediate", "Advanced", "Native or Bilingual"],
  isValid: Ember.computed('validations.isValid', function(){
  	console.log('isValid')
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
			let form = this.getProperties("name", "proficiency");
			let language = this.get('store').createRecord('language', form);
			language.save().then((res) => {
				Ember.get(this, 'flashMessages').success('Success!');
				Foundation.reInit($('ul.accordion'))
				this.setProperties({
					name: null,
					proficiency: null
				})
			})
		}
	}
});
