import Ember from 'ember';

export default Ember.Component.extend({
  session: Ember.inject.service('session'),

  didInsertElement() {
    "use strict";
    this.$(document).foundation();
  }

  // See https://guides.emberjs.com/v2.3.0/components/the-component-lifecycle/#toc_making-updates-to-the-rendered-dom-with-code-didrender-code
  // didRender() {
  //   "use strict";
  //   this.$(document).foundation();
  // }


});
