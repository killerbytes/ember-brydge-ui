import Ember from 'ember';

export default Ember.Route.extend({
	sessionAccount: Ember.inject.service(),
  beforeModel() {
    this._super(...arguments);
    return this.get('sessionAccount.account'); // needed to make sure sessionAccount is full realized
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
