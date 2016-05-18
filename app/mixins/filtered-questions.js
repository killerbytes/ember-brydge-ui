import Ember from 'ember';

export default Ember.Mixin.create({
	session: Ember.inject.service(),
	limit: 3,
	toPending: Ember.computed.filterBy('model.toQuestions', 'status', 'pending'),
	toAccept: Ember.computed.filterBy('model.toQuestions', 'status', 'accepted'),
	toHidden: Ember.computed.filterBy('model.toQuestions', 'status', 'hide'),
	toPendingQuestions: Ember.computed.filterBy('toPending', 'delete', false),

	fromPending: Ember.computed.filterBy('model.fromQuestions', 'status', 'pending'),
	fromAccept: Ember.computed.filterBy('model.fromQuestions', 'status', 'accepted'),
	fromHidden: Ember.computed.filterBy('model.fromQuestions', 'status', 'hide'),
	fromPendingQuestions: Ember.computed.filterBy('fromPending', 'delete', false),

	asked: Ember.computed('model.fromQuestions.@each.status', 'model.fromQuestions.@each.delete', function(){
		return {
			pendingSidebar: this.get('fromPendingQuestions').slice(0, this.get('limit')),
			pending: this.get('fromPendingQuestions'),
			answered: this.get('fromAccept'),
			hiddenSidebar: this.get('fromHidden').slice(0, 2),
			hidden: this.get('fromHidden')
		}
	}),

	questions: Ember.computed('model.toQuestions.@each.status', 'model.toQuestions.@each.delete', function(){
		return {
			pendingSidebar: this.get('toPendingQuestions').slice(0, this.get('limit')),
			pending: this.get('toPendingQuestions'),
			answered: this.get('toAccept'),
			hiddenSidebar: this.get('toHidden').slice(0, 2),
			hidden: this.get('toHidden')
		}
	}),
});
