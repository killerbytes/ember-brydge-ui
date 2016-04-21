import Ember from 'ember';
import LocationMixin from 'web/mixins/locationMixin';
import AvatarMixin from 'web/mixins/avatarMixin';
import SaveProfileMixin from 'web/mixins/saveProfileMixin';

export default Ember.Controller.extend(LocationMixin,AvatarMixin,SaveProfileMixin,{
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
