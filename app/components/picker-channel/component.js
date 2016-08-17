import Ember from 'ember';

export default Ember.Component.extend({
	ask: Ember.inject.service(),
	utils: Ember.inject.service(),
	store: Ember.inject.service(),
	classNames: ['accordion-picker'],
	selectedText: Ember.computed('selected', function(){
		return this.get('selected') ? this.getCategory(this.get('selected')) : {name: "My Connections"};
		// return this.get('selected') ? this.getIndustryName(this.get('selected')) : this.getIndustryName(0);
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
  getCategory(value){
    var categories = this.get('categories');
    return _.chain(_.map(categories, 'categories'))
               .flatten()
               .map((i)=>{ return i.industries; })
               .flatten()
               .filter((d)=>{ return d.data.code == value; })
               .map((i)=>{ return {code: i.data.code, name: i.data.subIndustry } })
               .first()
               .value();
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
			this.sendAction('select', id);
			this.$('.accordion').foundation('toggle', this.$('.accordion-content'));
		},
		delete(item){
			item.destroyRecord();
		},

	}
});
