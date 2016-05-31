import Ember from 'ember';
import Validations from '../../models/validations/interest';

export default Ember.Component.extend(Validations, {
	flashMessages: Ember.inject.service(),
	store: Ember.inject.service(),
	classNames: ['profile-accordion', 'no-bullet'],
  selected: null,
	actions: {
		select(item){
			this.set('selected', item);
		},
		update(item){
			this.$('ul.accordion').foundation('toggle', $('.accordion-content'))		
			item.save(()=>{
				Ember.get(this, 'flashMessages').success('Success!');
			});
		},
		delete(item){
			item.destroyRecord();
		},

		create(){
			console.log(this.store)
			let form = this.getProperties("content");
			let interest = this.get('store').createRecord('interest', form);

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
