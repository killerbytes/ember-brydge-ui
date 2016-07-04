import Ember from 'ember';

export default Ember.Component.extend( {
	flashMessages: Ember.inject.service(),
	store: Ember.inject.service(),
	ajax: Ember.inject.service(),
	session: Ember.inject.service(),
	classNames: ['profile-accordion', 'no-bullet'],
	highlightStatuses: [
		'Select a career status', 
		'On a Sabbatical',
		'Looking for Work',
		'Self-employed Freelancer',
		'Self-employed Consultant',
		'Independent Contractor' ],
	today: moment(),
	model: Ember.computed(function(){
		return this.get('store').createRecord('experience');
	}),
	list: Ember.computed.filterBy('items', 'isNew', false),
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
    }).then(res=>{
      Ember.get(this, 'flashMessages').success('Title: ' + data.status + ' has been set');
    })


	},


	actions: {
		update (item) {
			this.sendAction('update', item, ()=>{
				this.$('ul.accordion').foundation('toggle', $('.accordion-content'))		
			});
		},
    create(data, cb){
      this.get('model').save().then(()=>{
        Ember.get(this, 'flashMessages').success('Success!');
				this.$('ul.accordion').foundation('toggle', $('.accordion-content'));
				Foundation.reInit($('ul.accordion'));
      })
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
					experience.save().then(res=>{
						var profile = this.get('store').peekRecord('profile', this.get('profile.id'))
						profile.set('currentTitle', res.get('title'));
						profile.set('currentCompany', res.get('company'));
			      Ember.get(this, 'flashMessages').success('Highlight Success!');
					});
					this.set('isHighlightStatus', false);
					break; 
			}
		},


	}
});
