import Ember from 'ember';
import FilteredQuestionsMixin from 'web/mixins/filtered-questions';
import ProfileMixin from 'web/mixins/profile';
import IndustryMixin from 'web/mixins/industry';

export default Ember.Controller.extend(
  IndustryMixin,
  ProfileMixin,
	FilteredQuestionsMixin, {
  sessionAccount: Ember.inject.service(),
  ask: Ember.inject.service(),
  reachedInfinity: Ember.observer('model.toQuestions.reachedInfinity', function() {
  	this.set('canLoadMore', this.get('model.toQuestions.reachedInfinity'));
  }),
  askUserEnabled: Ember.computed('profile.setting.ask', function(){
    return this.get('profile.setting.ask');
  }),
  askEnabled: Ember.computed('sessionAccount.account.profile.setting.ask', function(){
    return this.get('sessionAccount.account.profile.setting.ask');
  }),
  actions: {
    submit: function() {
			this.get('ask').create(this.get('profile.id'), this.get('question').trim()).then(res=>{
          this.set('question', null);
          this.set('isAsked', true)
      })
    }
  }

});
