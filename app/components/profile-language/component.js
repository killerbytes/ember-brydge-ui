import Ember from 'ember';
import Validations from '../../models/validations/language';

export default Ember.Component.extend(Validations, {
	flashMessages: Ember.inject.service(),
	classNames: ['profile-accordion', 'no-bullet'],
  languageProficiency: ["Beginner", "Intermediate", "Upper Intermediate", "Advanced", "Native or Bilingual"],
  isValid: Ember.computed('validations.isValid', function(){
  	console.log('isValid')
  }),

	actions: {
		update: function(item){
			this.$('ul.accordion').foundation('toggle', $('.accordion-content'))		
			item.save().then(()=>{
				console.log('save')
				Ember.get(this, 'flashMessages').success('Success!');
			});
		},
		delete: function(item){
			item.destroyRecord();

		},
		create: function(){
			let form = this.getProperties("name", "proficiency");
			let language = this.store.createRecord('language', form);
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
