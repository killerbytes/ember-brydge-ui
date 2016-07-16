import Ember from 'ember';
import FilteredQuestionsMixin from 'web/mixins/filtered-questions';
import ProfileSidebarMixin from 'web/mixins/profile-sidebar';

export default Ember.Controller.extend(
  ProfileSidebarMixin,
	FilteredQuestionsMixin, {
  sessionAccount: Ember.inject.service(),
  ask: Ember.inject.service(),
  queryParams: ['tab','qid'],
  tab: 'questions',
  isNotEmptyOccupation: Ember.computed('profile.industryTwoName', 'profile.industryThreeName', function(){
    return this.get('profile.industryTwoName') ? true : false && this.get('profile.industryThreeName') ? true : false;
  }),
  placeholder: Ember.computed('profile', function(){
  	return 'Ask ' + this.get('profile.firstName') + ' a professional question or opinion';
  }),
  isConnected: Ember.computed('profile.connection.status', function(){
    return this.get('profile.connection.status') == 'accepted' ? true : false;
  }),
  actions: {
    submit: function() {
			this.get('ask').create(this.get('profile.id'), this.get('question')).then(res=>{
          this.set('question', null);
      })
      // var savedCallback = () => {
      //   // this.sendAction('action', this.get('controller.profile.id'));
      //   // this.set('isSubmitted', true)
      // };

      // ask.set('from', this.get('sessionAccount.account'));
			//
      // this.store.findRecord('user', this.get('controller.profile.id')).then((user)=>{
      //   ask.set('to', user);
      //   this.set('question', null)
      //   ask.save().then(savedCallback);
      // })
    }
  }

});
