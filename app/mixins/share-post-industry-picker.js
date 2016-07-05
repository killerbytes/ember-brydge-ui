import Ember from 'ember';

export default Ember.Mixin.create({
  init: function(){
    this._super(...arguments);
    this.set('categories', []);
  },
  toggle(state){
    this.get('elem').find('.accordion-picker').foundation(state, this.get('elem').find('.accordion-picker .accordion-content'));
  },
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
      // var data = {
      //   postContent: this.get('postContent'),
      //   categories: _.map(this.get('categories'), 'id'),
      //   site: this.get('site')
      // }

      this.sendAction('submit', ()=>{
      	this.toggle('up');
        this.setProperties({
        //   postContent: null,
          categories: [],
          site: null,
        //   isNoPreview: false,
          occupationOne: false,
          occupationTwo: false,
          industryId: false
        })
      })

      Ember.run.later(()=>{
        this.get('elem').find('textarea').get(0).style.height = '';
      })

    },

	}
});
