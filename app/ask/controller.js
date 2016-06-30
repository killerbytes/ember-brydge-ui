import Ember from 'ember';
import FilteredQuestionsMixin from 'web/mixins/filtered-questions';
import ProfileSidebarMixin from 'web/mixins/profile-sidebar';

export default Ember.Controller.extend(
  ProfileSidebarMixin,
	FilteredQuestionsMixin, {
  sessionAccount: Ember.inject.service(),
  queryParams: ['tab','qid'],
  tab: 'questions',
  isNotEmptyOccupation: Ember.computed('profile.occupationOne', 'profile.OccupationTwo', function(){
    return this.get('profile.occupationOne') ? true : false && this.get('profile.OccupationTwo') ? true : false;
  }),
  placeholder: Ember.computed('profile', function(){
  	return 'Ask ' + this.get('profile.firstName') + ' a professional question or opinion';
  }),
  isConnected: Ember.computed('profile.connection.status', function(){
    return this.get('profile.connection.status') == 'accepted' ? true : false;
  }),
  
});
