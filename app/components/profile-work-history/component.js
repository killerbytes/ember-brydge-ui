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
		'Student',
		'Graduate',
		'On Sabbatical Leave',
		'Looking for Work',
		'Freelancer',
		'Self-employed',
		'Independent Consultant',
		'Independent Contractor' ],
	today: moment(),
	default: Ember.computed(function(){
		return this.get('store').createRecord('experience', {startFrom: new Date(), endAt: new Date()});
	}),
	item: Ember.computed(function(){
		return this.get('default');
	}),
	list: Ember.computed.filterBy('items', 'isNew', false),
	profile: Ember.computed('sessionAccount.account.profile', function(){
		return this.get('sessionAccount.account.profile');
	}),
	isHighlightStatus: Ember.computed('profile.customTitle', function(){
		return this.get('profile.customTitle');
	}),
  _onDropdownChange: Ember.observer('highlightStatus', function() {
  	if(this.get('isHighlightStatus') && this.get('highlightStatus') != "Select a career status") this._highlightStatus();
  }),
  _resetShowHighlight(){
		_.each(this.get('list'), function(i){
			i.set('isProfileTitle', false)
		})
		this.set('profile.customTitle', false);
  },
	_highlightStatus(){
		var profile = this.get('store').peekRecord('profile', this.get('session.data.authenticated.user_id'));
		profile.set('customTitle', true);
		profile.set('currentTitle', this.get('highlightStatus'));
		profile.set('currentCompany', null);
		profile.save();
	},
	actions: {
    updateWork(item, cb){
      item.save().then(()=>{
        Ember.get(this, 'flashMessages').success('Success!');
        cb.apply();
      });
    },
		update (data, cb) {
			data.save().then(()=>{
				this.$('ul.accordion').foundation('toggle', $('.accordion-content'))
				cb.apply();
			})
		},
    create(data, cb){
      data.save().then(()=>{
				this.$('ul.accordion').foundation('toggle', $('.accordion-content'));
				cb.apply();
				Ember.run.later(()=>{
					Foundation.reInit($('ul.accordion'));
					this.set('item', this.get('default'))
				})
      })
    },
		delete(item){
			item.destroyRecord();
		},
		highlightCustom(){
			this._resetShowHighlight();
			this._highlightStatus();
			let userid = this.get('session.data.authenticated.user_id');
			var data = {
				status: this.get('highlightStatus')
	    };

	    this.get('ajax').request('/v2/profile-highlight/'+userid, {
	      method: 'PATCH',
	      data: {highlight: data},
	    })

		},
		highlight(item){
			item.set('isProfileTitle', true)
			item.save().then(res=>{
				this._resetShowHighlight();
				item.set('isProfileTitle', true)
			});
		}
	}
});
