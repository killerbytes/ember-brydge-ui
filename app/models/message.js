import DS from 'ember-data';

export default DS.Model.extend({
  avatar: DS.attr(),
  content: DS.attr(),
  sender: DS.attr(),
  userid: DS.attr(),
  conversationid: DS.attr(),
  firstName: DS.attr(),
  lastName: DS.attr(),
  updatedAt: DS.attr('date'),
  fullName: Ember.computed('firstName', 'lastName', function(){
  	return this.get('firstName') + ' ' + this.get('lastName');
  })
});
