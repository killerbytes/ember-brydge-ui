import Ember from 'ember';

export default Ember.Controller.extend({
  dialog: Ember.inject.service(),
  isHeader: Ember.computed.equal('header', 'header'),
  isStatic: Ember.computed.equal('header', 'static'),
  isNoHeader: Ember.computed.equal('header', null),
});
