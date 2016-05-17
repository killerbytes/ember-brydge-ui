import Ember from 'ember';

export default Ember.Route.extend({
	sessionAccount: Ember.inject.service(),
  beforeModel() {
    this._super(...arguments);
    return this.get('sessionAccount.account'); // needed to make sure sessionAccount is full realized
  },
	model: function() {
		let ownerid = this.get('sessionAccount.account.id');
		return Ember.RSVP.hash({
      fromQuestions: this.store.query('ask',{from: ownerid}),
      toQuestions: this.store.query('ask',{to: ownerid}),

    })
	},
	setupController(controller, model){
		this._super(...arguments);
		controller.set('username', this.get('sessionAccount.account.username'))
		controller.setProperties(model);
    console.log(model)
	},
	actions: {
    didTransition: function(){
      Ember.run.later(()=>{
        Ember.$('.question-tab .tabs:first').on('change.zf.tabs', (e, elem)=>{
          this.set('controller.tab', elem.data('tab'))
        })
      })
    },
    // reloadQuestions(){
    //   this.controller.get('model.fromQuestions').forEach((item)=>{
    //     item.reload()
    //   })
    // }


	}

});