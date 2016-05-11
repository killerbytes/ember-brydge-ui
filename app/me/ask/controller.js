import Ember from 'ember';
import FilteredQuestionsMixin from 'web/mixins/filtered-questions';

export default Ember.Controller.extend(
	FilteredQuestionsMixin, {
	settings: Ember.inject.service(),
  ask: Ember.inject.service(),
  isOwner: true,
  actions: {
    settingsChanged(value){
    	this.set('profile.settings.'+value, !this.get('profile.settings.'+value))
      this.get('settings').update(this.get('profile.settings'));
    },
  	selectItem(item) {
  		this.set('ask.selectedQuestion', item);
  	},
    rejectItem(item){
      this.get('ask').delete(item.id);
    },
    toggleItem(item){
      this.get('ask').hide(item.id);
    },

  }
});
