import Ember from 'ember';

export default Ember.Mixin.create({
  init: function(){
    this._super(...arguments);
    this.set('categories', []);
  },
  toggle(state){
    this.get('elem').find('.accordion-picker').foundation(state, this.get('elem').find('.accordion-picker .accordion-content'));
  },
  _didUpdate: Ember.observer('sharePost.post', function() {
    this.set('sharePost.valueText', null);
    this.setProperties({
      categories: [],
      site: null,
      industryOneId: false,
      industryTwoId: false,
      industryThreeId: false
    })
    this.toggle('up');
  }),
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
    submit() {
      this.set('sharePost.categories', _.map(this.get('categories'), 'id'));

      this.sendAction('submit', ()=>{
      // 	this.toggle('up');
        this.get('elem').foundation('close');
      })

      Ember.run.later(()=>{
        this.get('elem').find('textarea').get(0).style.height = '';
      })

    },

	}
});
