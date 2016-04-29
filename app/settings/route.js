import Ember from 'ember';

export default Ember.Route.extend({
	actions: {
    didTransition: function(){
      Ember.run.later(()=>{
        Ember.$('.settings .tabs:first').on('change.zf.tabs', (e, elem)=>{
          this.set('controller.tab', elem.data('tab'))
        })
      })
    },

	}
});
