import Ember from 'ember';

export default Ember.Route.extend({
  model: function(params) {  
    return Ember.RSVP.hash({
      profile: this.store.findRecord('public-profile', params.username)
    })
  },
  afterModel: function(model){
    var userid = model.profile.get('userid');

  
    Ember.RSVP.hash({
      fromCompliments: this.store.query('compliment',{from: userid}),
      toCompliments: this.store.query('compliment',{to: userid})
    }).then((result)=>{
      this.controller.set('fromCompliments',result.fromCompliments);
      this.controller.set('toCompliments',result.toCompliments);
    });
  },
  setupController: function(controller, model){
    this._super(controller, model);
    controller.setProperties(model);
  }
});
