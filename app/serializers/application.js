// import DS from 'ember-data';

// export default DS.JSONAPISerializer.extend({
//   keyForAttribute: function(attr) {
//     return Ember.String.underscore(attr);
//   }
// });

import Ember from 'ember';
import DS from 'ember-data';

var underscore = Ember.String.underscore;

export default DS.JSONAPISerializer.extend({
 
  // keyForAttribute: function(attr, method) {
  // 	console.log('<<<<<<< Application keyForAttribute <<<<<<<<<');
  //   return Ember.String.dasherize(attr).toUpperCase();
  // }
});