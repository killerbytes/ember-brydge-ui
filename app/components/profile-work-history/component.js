import Ember from 'ember';
import Validations from '../../models/validations/experience';

export default Ember.Component.extend(Validations, {
	store: Ember.inject.service(),
	ajax: Ember.inject.service(),
	session: Ember.inject.service(),
	classNames: ['profile-accordion', 'no-bullet'],
	highlightStatuses: ['Select a career status', 'On Sabbatical', 'Retired', 'Looking for Work', 'Self-employed', 'Freelance and Consulting'],
	today: moment(),
	from: Ember.computed('today', function(){
		return this.get('today');
	}),
	to: Ember.computed('today', function(){
		return this.get('today');
	}),
  _onDropdownChange: Ember.observer('highlightStatus', function() {
  	if(this.get('isHighlightStatus')) this.onHighlightStatus();
  }),
	onHighlightStatus(){
		if(!this.get('highlightStatus') || this.get('highlightStatus') == 'Select a career status') return false;

		let userid = this.get('session.data.authenticated.user_id');
		var data = { 
			status: this.get('highlightStatus')
    };

    this.get('ajax').request('/v1/profile/'+userid+'/highlight', {
      method: 'POST',
      data: data,
      // contentType: false,
      // processData: false,
    }).then((res)=>{
      console.log(res);
    })


	},


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
			switch(item){
				case 'isHighlightStatus':
					this.set('isHighlightStatus', true);
					this.onHighlightStatus();
					break;
				default:
					var experience = this.get('store').peekRecord('experience', item)
					experience.set('showHighlight', true);
					experience.save();
					this.set('isHighlightStatus', false);
					break; 
			}
		},


	}
});
