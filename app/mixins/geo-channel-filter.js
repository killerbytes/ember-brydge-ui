import Ember from 'ember';

export default Ember.Mixin.create({
	setupController: function(controller, model) {
    console.log('geo-chanel (Mixin) =>', model.profile.get('location'));
    controller.selectedLoc = 'aa';
    controller.filteredLoc = 'abc';
    this._super(controller, model);
  }
});
