import Ember from 'ember';

export default Ember.Component.extend( {
	flashMessages: Ember.inject.service(),
	store: Ember.inject.service(),
	ajax: Ember.inject.service(),
	session: Ember.inject.service(),
	sessionAccount: Ember.inject.service(),
	classNames: ['accordion-form'],
	tagName: 'form',
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
	profile: Ember.computed('sessionAccount.account.profile', function(){
		return this.get('sessionAccount.account.profile');
	}),
	isHighlightStatus: Ember.computed('profile.customTitle', function(){
		return this.get('profile.customTitle');
	}),
  _onDropdownChange: Ember.observer('highlightStatus', function() {
  	if(this.get('isHighlightStatus')) this.onHighlightStatus();
  }),
  setProfile(data){
		var profile = this.get('sessionAccount.account.profile');
		profile.set('currentTitle', data.get('title'));
		profile.set('currentCompany', data.get('company'));
		console.log(profile)
  },
  resetShowHighlight(){
		_.each(this.get('list'), function(i){
			i.set('showHighlight', false)
		})
		this.set('profile.customTitle', false);
  },
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
    updateWork(item, cb){
      item.save().then(()=>{
        Ember.get(this, 'flashMessages').success('Success!');
        cb.apply();
      });
    },
		update (item) {
			item.save().then(()=>{
				this.$('ul.accordion').foundation('toggle', $('.accordion-content'))		
			})
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
		onHighlightCustom(){
			this.resetShowHighlight();
			// this.set('isHighlightStatus', true);
			this.set('profile.customTitle', true);
			this.onHighlightStatus();
		},
		onHighlight(item){
			this.resetShowHighlight();
			// var model = this.get('store').peekRecord('experience', item.id)
			item.set('showHighlight', true);
			item.save().then(res=>{
	      Ember.get(this, 'flashMessages').success('Highlight Success!');
	      this.setProfile(res);
			});
			// this.set('isHighlightStatus', false);

		},


	}
});
