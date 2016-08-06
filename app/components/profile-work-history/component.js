import Ember from 'ember';

export default Ember.Component.extend( {
	store: Ember.inject.service(),
	ajax: Ember.inject.service(),
	session: Ember.inject.service(),
	sessionAccount: Ember.inject.service(),
	classNames: ['accordion-form'],
	tagName: 'form',
	highlightStatuses: [
		'Student',
		'Graduate',
		'On Sabbatical Leave',
		'Looking for Work',
		'Freelancer',
		'Self-employed',
		'Independent Consultant',
		'Independent Contractor' ],
	today: moment(),
	default: function(){
		return this.get('store').createRecord('experience', {startFrom: new Date(), endAt: new Date()});
	},
	item: Ember.computed(function(){
		return this.default();
	}),
	defaultCareerStatus: Ember.computed(function(){
		return this.get('profile.customTitle') ? this.get('profile.currentTitle') : 'On Sabbatical Leave';
	}),
	list: Ember.computed.filterBy('items', 'isNew', false),
	profile: Ember.computed('sessionAccount.account.profile', function(){
		return this.get('sessionAccount.account.profile');
	}),
	isHighlightStatus: Ember.computed('profile.customTitle', function(){
		return this.get('profile.customTitle');
	}),
  _onDropdownChange: Ember.observer('highlightStatus', function() {
  	if(this.get('isHighlightStatus')) this._highlightStatus();
  }),
	_highlightStatus(){
		var userid = this.get('session.data.authenticated.user_id');
		var data = {
			status: this.get('defaultCareerStatus')
		};
		this.get('ajax').request('/v2/profile-highlight/'+userid, {
			method: 'PATCH',
			data: { highlight: data },
		}).then(res=>{
			this._resetShowHighlight();
			var profile = this.get('store').peekRecord('profile', userid);
			profile.set('customTitle', true);
		})
	},
  _resetShowHighlight(){
		_.each(this.get('list'), function(i){
			i.set('isProfileTitle', false)
		})
		this.set('profile.customTitle', false);
  },
	actions: {
    updateWork(item, cb){
      item.save().then(()=>{
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
			this._resetShowHighlight();
      data.save().then(()=>{
				cb.apply();
				this.set('item', this.default())
				Ember.run.later(()=>{
					Foundation.reInit($('ul.accordion'));
					this.$('ul.accordion').foundation('toggle', $('.accordion-content'));
				})
      })
    },
		delete(item){
			item.destroyRecord();
		},
		clear(){
			this.set('item', this.default())
		},
		highlightCustom(){
			this._highlightStatus();
		},
		highlight(item){
			// this._setProfile(false, item.get('title'), item.get('company'))
			item.set('isProfileTitle', true)
			item.save().then(res=>{
				this._resetShowHighlight();
				item.set('isProfileTitle', true)
				// var data = {
				// 	status: item.get('title')
				// }
				// this._highlightStatus(data);
			});
		}
	}
});
