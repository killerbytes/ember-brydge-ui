import Ember from 'ember';
import FilteredQuestionsMixin from 'web/mixins/filtered-questions';
import ProfileMixin from 'web/mixins/profile';

export default Ember.Controller.extend(
  ProfileMixin,
	FilteredQuestionsMixin, {
  sessionAccount: Ember.inject.service(),
  ask: Ember.inject.service(),
  reachedInfinity: Ember.observer('model.fromQuestions.reachedInfinity', function() {
  	this.set('canLoadMore', this.get('model.fromQuestions.reachedInfinity'));
  }),
  isNotEmptyOccupation: Ember.computed('profile.industryTwoName', 'profile.industryThreeName', function(){
    return this.get('profile.industryTwoName') ? true : false && this.get('profile.industryThreeName') ? true : false;
  }),
  placeholder: Ember.computed('profile', function(){
  	return 'Ask ' + this.get('profile.firstName') + ' a professional <br> question or opinion';
  }),
  isConnected: Ember.computed('profile.connection.status', function(){
    return this.get('profile.connection.status') == 'accepted' ? true : false;
  }),
  askUserEnabled: Ember.computed('profile.setting.ask', function(){
    return this.get('profile.setting.ask');
  }),
  askEnabled: Ember.computed('sessionAccount.account.profile.setting.ask', function(){
    return this.get('sessionAccount.account.profile.setting.ask');
  }),
  actions: {
    submit: function() {
			this.get('ask').create(this.get('profile.id'), this.get('question')).then(res=>{
          this.set('question', null);
          this.set('isAsked', true)
      })
    }
  }

});
