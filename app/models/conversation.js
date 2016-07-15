import DS from 'ember-data';

export default DS.Model.extend({
  avatar: DS.attr(),
  content: DS.attr(),
  conversationid: DS.attr(),
  recepient: DS.attr(),
  firstName: DS.attr(),
  lastName: DS.attr(),
  messageid: DS.attr(),
  updatedAt: DS.attr('date'),
  readStatus: DS.attr(),
  messages: DS.hasMany(),
  action: DS.attr(),
  you: DS.belongsTo('user'),
  other: DS.belongsTo('user'),
  fullName: Ember.computed('firstName', 'lastName', function(){
  	return this.get('firstName') + ' ' + this.get('lastName');
  })

});
