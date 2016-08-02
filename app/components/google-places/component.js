import Ember from 'ember';
export default Ember.Component.extend({
  tagName: 'span',
  description: Ember.computed('item', function(){
    console.log(this.get('item'))
  })
});
