import Ember from 'ember';
import FilteredQuestionsMixin from 'web/mixins/filtered-questions';

export default Ember.Controller.extend(FilteredQuestionsMixin, {
  session: Ember.inject.service(),
  isOwner: Ember.computed('model.requestid', function(){
    return this.get('model.requestid') == this.get('session.data.authenticated.user_id');
  }),
  isInbox: Ember.computed('model.requestid', function(){
    return this.get('model.requestid') == this.get('model.to.id');
  })
});
