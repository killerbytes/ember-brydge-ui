import Ember from 'ember';
import ViewCommentsActionMixin from 'web/mixins/view-comments-action';


export default Ember.Component.extend(ViewCommentsActionMixin,{
	store: Ember.inject.service(),
  sessionAccount: Ember.inject.service(),
  completePercent: Ember.computed('sessionAccount.account.profile.profileComplete.completePercent', function(){
    return this.get('sessionAccount.account.profile.profileComplete.completePercent');
  }),
});
