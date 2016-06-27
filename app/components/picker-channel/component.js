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
      id: this.get('profile.occupationOneId'),
      text: this.get('profile.occupationOne')
    },{
      id: this.get('profile.occupationTwoId'),
      text: this.get('profile.occupationTwo')
    }];			
	}),
	getIndustryName: function (id) {    
    var col = {};
    col[0] = "My Connections";
    col[this.get('profile.industryId')] = this.get('profile.industry');
    col[this.get('profile.occupationOneId')] = this.get('profile.occupationOne');
    col[this.get('profile.occupationTwoId')] = this.get('profile.occupationTwo');
    return col[id];
  },
	actions: {
		select(id){
			this.sendAction('select', id);
			this.$('.accordion-picker').foundation('toggle', this.$('.accordion-content'));
		}
	}
});
