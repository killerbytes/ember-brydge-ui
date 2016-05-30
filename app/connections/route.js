import Ember from 'ember';

export default Ember.Route.extend({
  session: Ember.inject.service('session'),
  model: function(params) {  
    let userid = params.username;

     this.store.unloadAll();
    return Ember.RSVP.hash({
      me: this.store.findRecord('profile', this.get('session.data.authenticated.user_id')),
      profile: this.store.findRecord('profile', userid, {reload: true}),
      list: this.store.query('contact',{userid: userid},{reload: true}),
      mutual: this.store.query('contact',{targetid: userid},{reload: true})
    });
    
  },
  // model: function(params) {
  //   return Ember.RSVP.hash({
  //   	profile: this.store.findRecord('public-profile', params.username)
  //   })
  // },
  // afterModel: function(model){
  // 	var userid = model.profile.get('userid');
  // 	this.store.query('connection',{to: userid}).then((res)=>{
		// 	this.controller.set('list', res)
		// })
  //   this.store.query('contact',{targetid: userid}).then((res)=>{
  //     console.log('<<<< mutual')
  //     this.controller.set('mutual', res)
  //   })
  // },
  setupController(controller, model){
		this._super(controller, model);
		controller.setProperties(model);
  }


});
