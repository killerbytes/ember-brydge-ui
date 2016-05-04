import Ember from 'ember';
import FilteredQuestionsMixin from 'web/mixins/filtered-questions';
import CheckCurrentUserMixin from 'web/mixins/check-current-user';

export default Ember.Controller.extend(
	CheckCurrentUserMixin,
	FilteredQuestionsMixin, {
});
