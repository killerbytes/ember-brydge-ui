import Ember from 'ember';

export default Ember.Mixin.create({
	session: Ember.inject.service(),
	limit: 3,
  profile: Ember.computed.alias('model.profile'),
	toQuestions: Ember.computed.filterBy('model.toQuestions', 'status', 'accepted'),
	fromQuestions: Ember.computed.filterBy('model.fromQuestions', 'status', 'accepted'),
	inbox: Ember.computed.alias('model.inbox')
});
