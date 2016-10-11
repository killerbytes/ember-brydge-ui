import Ember from 'ember';
import _ from 'lodash/lodash';
import SharePostIndustryPicker from 'web/mixins/industry';

export default Ember.Component.extend(SharePostIndustryPicker, {
	ask: Ember.inject.service(),
	utils: Ember.inject.service(),
	store: Ember.inject.service(),
	classNames: ['accordion-picker'],
	selectedText: Ember.computed('selected', function(){
		return this.get('selected') ? this._getCategory(this.get('selected')) : {industry: "My Connections"};
	}),
	isIndustry: Ember.computed.or('profile.industryOneId', 'profile.industryTwoId', 'profile.industryThreeId'),
	_getCategory(id){
		return this.get('store').findRecord('industry', id);
	},
	getIndustryName: function (id) {
    var col = {};
    col[0] = "My Connections";
    col[this.get('profile.industryOneId')] = this.get('profile.industryOneName');
    col[this.get('profile.industryTwoId')] = this.get('profile.industryTwoName');
    col[this.get('profile.industryThreeId')] = this.get('profile.industryThreeName');
    return col[id];
  },
	actions: {
		select(id){
			this.$('.accordion').foundation('toggle', this.$('.accordion-content'));
			Ember.run.later(()=>{
				this.sendAction('select', id);
			}, 400)
		},
		delete(item){
			item.set('selected', false);
			item.destroyRecord();
		},

	}
});
