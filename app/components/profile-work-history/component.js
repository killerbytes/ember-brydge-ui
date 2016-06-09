import Ember from 'ember';
import Validations from '../../models/validations/experience';

export default Ember.Component.extend(Validations, {
	store: Ember.inject.service(),
	ajax: Ember.inject.service(),
	classNames: ['profile-accordion', 'no-bullet'],
	today: moment(),
	from: Ember.computed('today', function(){
		return this.get('today');
	}),
	to: Ember.computed('today', function(){
		return this.get('today');
	}),
	actions: {
		update (item) {
			this.sendAction('update', item, ()=>{
				this.$('ul.accordion').foundation('toggle', $('.accordion-content'))		
			});
		},
		create () {
			this.sendAction('create', this, ()=>{
				this.$('ul.accordion').foundation('toggle', $('.accordion-content'))	
				Foundation.reInit($('ul.accordion'))
			});
		},
		delete(item){
			item.destroyRecord();
		},
		onHighlight(item){

			var experience = this.get('store').peekRecord('experience', item)
			experience.set('showHighlight', true);
			experience.save();
		},
		setHighlight(){
			var data = { 
					"location": "S",
	        "title": "Tester1",
	        "highlight": "retired",
	        "showHighlight": true,
	        "currentCompany": true,
	        "company": "C"
        };

      this.get('ajax').request('/v1/profile/2zd33na16gv/experience/111rahvivuop', {
        method: 'POST',
        data: data,
        contentType: false,
        processData: false,
      }).then((res)=>{
        console.log(res);
      })


		}


	}
});
