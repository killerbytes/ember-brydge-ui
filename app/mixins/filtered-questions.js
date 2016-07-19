import Ember from 'ember';

export default Ember.Mixin.create({
	session: Ember.inject.service(),
	limit: 3,
  profile: Ember.computed.alias('model.profile'),
	sort: ['updatedAt:desc'],
	sortAnswered: ['answeredAt:desc'],
	toQuestionsAccepted: Ember.computed.filterBy('model.toQuestions', 'status', 'accepted'),
  toQuestions: Ember.computed.sort('toQuestionsAccepted', 'sortAnswered'),
	FromQuestionsAccepted: Ember.computed.filterBy('model.fromQuestions', 'status', 'accepted'),
	fromQuestions: Ember.computed.sort('FromQuestionsAccepted', 'sortAnswered'),
	inbox: Ember.computed.alias('model.inbox')

	// fromQuestions: Ember.computed('model.fromQuestions', function(){
	// 	console.log(this.get('model.fromQuestions'))
	// }),


	// toPending: Ember.computed.filterBy('toQuestions', 'status', 'pending'),
	// toAccept: Ember.computed.filterBy('toQuestions', 'status', 'accepted'),
	// toHidden: Ember.computed.filterBy('toQuestions', 'status', 'hide'),
	// toPendingQuestions: Ember.computed.filterBy('toPending', 'delete', false),
	// toAnswered: Ember.computed.sort('toAccept', 'sortAnswered'),
	// toHiddenSorted: Ember.computed.sort('toHidden', 'sortAnswered'),
	//
	// fromPending: Ember.computed.filterBy('fromQuestions', 'status', 'pending'),
	// fromAccept: Ember.computed.filterBy('fromQuestions', 'status', 'accepted'),
	// fromHidden: Ember.computed.filterBy('fromQuestions', 'status', 'hide'),
	// fromPendingQuestions: Ember.computed.filterBy('fromPending', 'delete', false),
	// fromAnswered: Ember.computed.sort('fromAccept', 'sortAnswered'),
	// fromHiddenSorted: Ember.computed.sort('fromHidden', 'sortAnswered'),
	//
	// from: Ember.computed('fromQuestions.@each.status', 'fromQuestions.@each.delete', function(){
	// 	return {
	// 		pendingSidebar: this.get('fromPendingQuestions').slice(0, this.get('limit')),
	// 		showLink: Ember.computed('fromPendingQuestions', ()=>{
	// 			return this.get('fromPendingQuestions').length > this.get('limit');
	// 		}),
	// 		pending: this.get('fromPendingQuestions'),
	// 		answered: ()=>{
	// 			return Ember.computed.sort('fromAccept', 'answeredSort')
	// 		},
	// 		hiddenSidebar: this.get('fromHidden').slice(0, 2),
	// 		hidden: this.get('fromHidden')
	// 	}
	// }),
	//
	// to: Ember.computed('toQuestions.@each.status', 'toQuestions.@each.delete', function(){
	// 	return {
	// 		pendingSidebar: this.get('toPendingQuestions').slice(0, this.get('limit')),
	// 		showLink: Ember.computed('toPendingQuestions', ()=>{
	// 			return this.get('toPendingQuestions').length > this.get('limit');
	// 		}),
	// 		pending: this.get('toPendingQuestions'),
	// 		answered: this.get('toAccept'),
	// 		hiddenSidebar: this.get('toHidden').slice(0, 2),
	// 		hidden: this.get('toHidden')
	// 	}
	// }),
});
