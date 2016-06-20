import Ember from 'ember';
import ViewCommentsActionMixin from 'web/mixins/view-comments-action';


export default Ember.Component.extend(ViewCommentsActionMixin,{
	store: Ember.inject.service(),
  sessionAccount: Ember.inject.service(),
  completeness: Ember.computed('sessionAccount.account.profile.profileComplete.completePercent', function(){
    return Ember.String.htmlSafe("width: " + this.get('sessionAccount.account.profile.profileComplete.completePercent') + '%');
  })
});
