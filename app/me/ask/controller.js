import Ember from 'ember';
import FilteredQuestionsMixin from 'web/mixins/filtered-questions';
import CheckCurrentUserMixin from 'web/mixins/check-current-user';

export default Ember.Controller.extend(
	CheckCurrentUserMixin,
	FilteredQuestionsMixin, {
	settings: Ember.inject.service(),
  actions: {
    settingsChanged(value){
    	this.set('profile.settings.'+value, !this.get('profile.settings.'+value))
      this.get('settings').update(this.get('profile.settings'));
    },
  	selectItem: function(item) {
  		this.set('selectedQuestion', item);
  	}
  }
});
