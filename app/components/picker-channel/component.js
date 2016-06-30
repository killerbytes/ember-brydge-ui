import Ember from 'ember';

export default Ember.Component.extend({
	ask: Ember.inject.service(),
	utils: Ember.inject.service(),
	store: Ember.inject.service(),
	classNames: ['accordion-picker'],
	selectedText: Ember.computed('selected', function(){
		return this.get('selected') ? this.getIndustryName(this.get('selected')) : this.getIndustryName(0);
	}), 
	industries: Ember.computed('profile', function(){
		return [{
      id: this.get('profile.industryTwoId'),
      text: this.get('profile.industryTwoName')
    },{
      id: this.get('profile.industryThreeId'),
      text: this.get('profile.industryThreeName')
    }];			
	}),
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
			this.sendAction('select', id);
			this.$('.accordion').foundation('toggle', this.$('.accordion-content'));
		}
	}
});
