import Ember from 'ember';

export default Ember.Component.extend({
  session: Ember.inject.service('session'),

  // didInsertElement() {
  //   "use strict";
  //   this.$(document).foundation();
  // },

  didRender() {
    console.log("^^ Did update attrs");
    "use strict";
    this.$(document).foundation();
  }


});
