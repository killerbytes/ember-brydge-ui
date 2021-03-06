import DS from 'ember-data';

export default DS.Model.extend({
  uid: DS.attr(),
  user: DS.belongsTo('user'),
  follower: DS.belongsTo('user'),
  isfollowing: DS.belongsTo('following')

  // avatar: DS.attr(),
  // userid: DS.attr(),
  // publicProfile: DS.attr(),
  // firstName: DS.attr({defaultValue: ''}),
	// lastName: DS.attr({defaultValue: ''}),
  // currentTitle: DS.attr('string'),
	// currentCompany: DS.attr('string'),
  // fullName: Ember.computed('firstName', 'lastName', function(){
	// 	return this.get('firstName') + ' ' + this.get('lastName');
	// }),
  // career: Ember.computed('currentTitle', 'currentCompany', function(){
	// 	var title = this.get('currentTitle');
	// 	var company = this.get('currentCompany');
	// 	return this.get('currentCompany') ? `${title} at ${company}` : title;
	// })
});
