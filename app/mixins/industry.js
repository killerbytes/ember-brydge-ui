import Ember from 'ember';

export default Ember.Mixin.create({
  init: function(){
    this._super(...arguments);
    this.set('categories', []);
  },
  toggle(state){
    this.get('elem').find('.accordion-picker').foundation(state, this.get('elem').find('.accordion-picker .accordion-content'));
  },
  _resetForm(){
    this.setProperties({
      postContent: null, //textarea
      categories: [],
      site: null,
    });
    if(this.get('sharePost')) this.set('sharePost.valueText', null);
    this.get('industries').forEach(res=>{
      Ember.set(res, 'checked', false);
    })
  },
  _didUpdate: Ember.observer('sharePost.post', function() {
    this._resetForm();
  }),
  industries: Ember.computed('profile', function(){
    var industries = [];
    if(this.get('profile.industryOneId')){
      industries.push({
        id: this.get('profile.industryOneId'),
        text: this.get('profile.industryOneName')
      })
    }
    if(this.get('profile.industryTwoId')){
      industries.push({
        id: this.get('profile.industryTwoId'),
        text: this.get('profile.industryTwoName')
      })
    }
    if(this.get('profile.industryThreeId')){
      industries.push({
        id: this.get('profile.industryThreeId'),
        text: this.get('profile.industryThreeName')
      })
    }
		return industries;
	}),
  isIndustry: Ember.computed.or('profile.industryOneId', 'profile.industryTwoId', 'profile.industryThreeId'),
  _removeLink(content, link){
    return content.replace(link, "");
  },
  isAddOrChange: Ember.computed.lte('industries.length', 2),
	actions: {
    toggle(){
    	this.toggle('toggle');
    },
    checkboxChanged(value, checked, text, e) {
      if(checked) {
        this.categories.pushObject({id: value, text: text, checked: checked});
        this.set(e.currentTarget.name, true)
      }else{
        var list = this.categories.toArray();
        _.remove(list, {id: value })
        this.set('categories', list);
        this.set(e.currentTarget.name, false)
      }
    },

	}
});
