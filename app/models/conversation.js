import DS from 'ember-data';

export default DS.Model.extend({
  you: DS.belongsTo('user'),
  other: DS.belongsTo('user'),
  targetid: DS.attr(),
  content: DS.attr(),
  createdAt: DS.attr(),
  messages: DS.attr(),
  firstName: DS.attr(),
  lastName: DS.attr(),
  avatar: DS.attr(),
  fullName: Ember.computed('firstName', 'lastName', function(){
  	return this.get('firstName') + ' ' + this.get('lastName');
  })
  
});
