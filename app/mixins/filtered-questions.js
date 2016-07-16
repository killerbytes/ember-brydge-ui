import Ember from 'ember';

export default Ember.Mixin.create({
	session: Ember.inject.service(),
	limit: 3,
  profile: Ember.computed.alias('model.profile'),

  fromQuestions: Ember.computed.alias('model.fromQuestions'),
  toQuestions: Ember.computed.alias('model.toQuestions'),

	toPending: Ember.computed.filterBy('toQuestions', 'status', 'pending'),
	toAccept: Ember.computed.filterBy('toQuestions', 'status', 'accepted'),
	toHidden: Ember.computed.filterBy('toQuestions', 'status', 'hide'),
	toPendingQuestions: Ember.computed.filterBy('toPending', 'delete', false),

	fromPending: Ember.computed.filterBy('fromQuestions', 'status', 'pending'),
	fromAccept: Ember.computed.filterBy('fromQuestions', 'status', 'accepted'),
	fromHidden: Ember.computed.filterBy('fromQuestions', 'status', 'hide'),
	fromPendingQuestions: Ember.computed.filterBy('fromPending', 'delete', false),

	from: Ember.computed('fromQuestions.@each.status', 'fromQuestions.@each.delete', function(){
		return {
			pendingSidebar: this.get('fromPendingQuestions').slice(0, this.get('limit')),
			showLink: Ember.computed('fromPendingQuestions', ()=>{
				return this.get('fromPendingQuestions').length > this.get('limit');
			}),
			pending: this.get('fromPendingQuestions'),
			answered: this.get('fromAccept'),
			hiddenSidebar: this.get('fromHidden').slice(0, 2),
			hidden: this.get('fromHidden')
		}
	}),

	to: Ember.computed('toQuestions.@each.status', 'toQuestions.@each.delete', function(){
		return {
			pendingSidebar: this.get('toPendingQuestions').slice(0, this.get('limit')),
			showLink: Ember.computed('toPendingQuestions', ()=>{
				return this.get('toPendingQuestions').length > this.get('limit');
			}),
			pending: this.get('toPendingQuestions'),
			answered: this.get('toAccept'),
			hiddenSidebar: this.get('toHidden').slice(0, 2),
			hidden: this.get('toHidden')
		}
	}),
});
