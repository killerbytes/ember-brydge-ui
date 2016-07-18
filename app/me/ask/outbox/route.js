import Ember from 'ember';
import InfinityRoute from "ember-infinity/mixins/route";

export default Ember.Route.extend(InfinityRoute, {
	session: Ember.inject.service(),
	model: function() {
		return this.infinityModel('ask',{
			from: this.get('session.data.authenticated.user_id'),
			perPage: 3,
			startingPage: 1
		});
	},
	actions: {
    didTransition: function(){
      Ember.run.later(()=>{
        Ember.$('.question-tab .tabs:first').on('change.zf.tabs', (e, elem)=>{
          this.set('controller.tab', elem.data('tab'))
        })
      })
    }


	}

});
