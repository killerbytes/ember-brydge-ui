import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import InfinityRoute from "ember-infinity/mixins/route";

export default Ember.Route.extend(AuthenticatedRouteMixin, InfinityRoute, {
  ajax: Ember.inject.service(),
  model: function(params) {
    // return this.store.findRecord('conversation', params.id);
    // return this.store.query('message', {
		// 	id: "adc73f9c4a4511e6a648acbc32b17109",
		// 	per_page: 999999,
		// 	page: 1
		// });

    return Ember.RSVP.hash({
      // conversation: this.store.findRecord('conversation', params.id),
      messages: this.store.query('message', {conversationid: params.id, per_page: 99999, page: 1})
      // return this.infinityModel('message',{
			// 	id: params.id,
			// 	perPage: 3,
			// 	startingPage: 1,
      //   // modelPath: 'controller.model.messages'
			// })
    });

  },
  afterModel(){
    this.store.findAll('conversation');
  },
  actions: {
  	submit() {
      this.store.findAll('conversation')
      this.controller.model.reload()
    },
    delete(id) {
      var conversation = this.store.peekRecord('conversation', id);
      conversation.set('action', 'toggle_hide');
      conversation.save()
        .then(res=>{
          this.store.unloadRecord(conversation);
          this.store.findAll('conversation');
          this.transitionTo('/messages');
        })
    },
    // load(){
    //   // console.log()
    //   this.store.queryRecord('conversation', {id: this.get('controller.model.id'), limit: 3, page: 2}).then(res=>{
    //     console.log(res.get('messages'))
    //     this.get('controller.model.messages').pushObjects(res.messages)
    //   })
    // }
  }
});
