import Ember from 'ember';
import FilteredQuestionsMixin from 'web/mixins/filtered-questions';

export default Ember.Controller.extend({
	sort: ['createdAt:desc'],
	list: Ember.computed.sort('model', 'sort')
});
