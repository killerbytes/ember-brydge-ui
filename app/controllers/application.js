import Ember from 'ember';

export default Ember.Controller.extend({
  session: Ember.inject.service(),
  dialog: Ember.inject.service(),
  isHeader: Ember.computed.equal('header', 'header'),
  isPublic: Ember.computed.equal('header', 'public'),
  isStatic: Ember.computed.equal('header', 'static'),
  isNoHeader: Ember.computed.equal('header', null)
});
