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
  isDisabled: Ember.computed.empty('question'),
  actions: {
    submit() {
			this.get('ask').create(this.get('profile.id'), this.get('question')).then(res=>{
          this.set('question', null);
          this.set('isAsked', true)
      })
    },
    focusIn(){
      if(!this.get('question')){
        this.set('question', '?');
      }
      if(this.get('question') == "?"){
        Ember.run.later(()=>{
          Ember.$('.user-top-form textarea').get(0).setSelectionRange(0,0);
        })        
      }
    }
  }

});
