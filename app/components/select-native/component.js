import Ember from "ember";

export default Ember.Component.extend({
  content: null,
  selectedValue: null,
  tagName: 'select',


  xxxinit(){
    this._super(...arguments);
    var content = this.get('content');

    if (!content) {
      this.set('content', []);
    }
  },

  // actions: {
    change(e) {
      // const changeAction = this.get('action');
      // const selectedIndex = ;
      const content = this.get('content');
      // const selectedValue = ;
      this.set('selectedValue', content[e.currentTarget.selectedIndex]);
      // changeAction(selectedValue);
    }
  // }
});
