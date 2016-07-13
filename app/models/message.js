import DS from 'ember-data';

export default DS.Model.extend({
  // from: DS.belongsTo('user'),
  // to: DS.belongsTo('user'),
  content: DS.attr(),
  userid: DS.attr(),
  conversationid: DS.attr(),
  firstName: DS.attr(),
  lastName: DS.attr(),
  fullName: Ember.computed('firstName', 'lastName', function(){
  	return this.get('firstName') + ' ' + this.get('lastName');
  })
  // createdAt: DS.attr(),
  // updatedAt: DS.attr()
});
