import Ember from 'ember';
import QueryLocationMixin from 'web/mixins/query-locations';
import AvatarMixin from 'web/mixins/avatar';
import SaveProfileMixin from 'web/mixins/save-profile';
import QueryIndustryMixin from 'web/mixins/query-industries';

export default Ember.Controller.extend(
  QueryLocationMixin,
  AvatarMixin,
  SaveProfileMixin,
  QueryIndustryMixin,
  {
    queryParams: ['tab'],
    tab: 'personal',
    
    // add work form
    isNewWork: false,
    // add education form
    isNewEducation: false,
    //
    // select 2 binding
    //
    chosenIndustry: null,
    chosenOccupTwo: null,
    chosenOccupOne: null,
    //
    // actions
    //
    selectedItem: null,

    actions: {
    	addNewWork: function() {
    		this.set('isNewWork', true);
    	},
    	
    	addNewEducation: function() {
    		this.set('isNewEducation', true);
    	},
      cancel: function(){
        console.log('cancel')
      },
      selectItem: function(item){
        this.set('selectedItem', item)
      }
    }
});
