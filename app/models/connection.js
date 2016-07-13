import DS from 'ember-data';

export default DS.Model.extend({
  avatar: DS.attr(),
  userid: DS.attr(),
  conversationid: DS.attr(),
  currentCompany: DS.attr(),
  currentTitle: DS.attr(),
  firstName: DS.attr(),
  lastName: DS.attr(),
  location: DS.attr(),
  status: DS.attr(),
  action: DS.attr('string', { defaultValue: false }),
  fullName: Ember.computed('firstName', 'lastName', function(){
  	return this.get('firstName') + ' ' + this.get('lastName');
  })
  // status: DS.attr('string', { defaultValue: 'pending' }),
});
