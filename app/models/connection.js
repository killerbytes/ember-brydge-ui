import DS from 'ember-data';

export default DS.Model.extend({
  avatar: DS.attr(),
  userid: DS.attr(),
  requestid: DS.attr(),
  friendid: DS.attr(),
  friend: DS.attr(),
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
  }),
  career: Ember.computed('currentTitle', 'currentCompany', function(){
		return this.get('currentCompany') ? this.get('currentTitle') + ' at ' + this.get('currentCompany') : this.get('currentTitle');
	})
});
