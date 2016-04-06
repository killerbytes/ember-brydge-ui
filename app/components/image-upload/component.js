import Ember from 'ember';

export default Ember.TextField.extend({
  type: 'file',
  change: function(evt) {
    var self = this;
    var input = evt.target;
    console.log('onchange=>', input.files[0]);
  }
});
