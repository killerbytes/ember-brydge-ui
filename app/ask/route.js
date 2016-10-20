import Ember from 'ember';
import BrydgeScroller from 'web/mixins/brydge-scroller';

export default Ember.Route.extend(
	BrydgeScroller, {
	ask: Ember.inject.service(),
	resetController(controller, isExiting, transition) {
      if (isExiting) {
				this.store.unloadAll('language');
        this.store.unloadAll('experience');
        this.store.unloadAll('education');
        controller.set('isAsked', null);
      }
  },
	ajax: Ember.inject.service(),
  beforeModel: function(transition) {
    var userid = this.get('session.data.authenticated.user_id');
    // if(!userid) this.transitionTo('public-profile', transition.params[transition.targetName].username);
    return this.get('ajax').request('v2/profiles/'+transition.params[transition.targetName].username,{
      method: 'OPTIONS'
    }).then(res=>{
      if (userid === res.userid) {
        this.transitionTo('me.ask.index');
        return;
      }else{
        this.set('userid', res.userid)
        return;
      }
    })
  },
	// beforeModel(transition) {
  //   this._super(...arguments);
	// 	const userid = this.get('session.data.authenticated.user_id');
	// 	if (userid === transition.params[transition.targetName].username) {
  //     this.transitionTo('me.ask.index');
  //   }
  // },
	model: function(params) {
    let userid = this.get('userid')
		return Ember.RSVP.hash({
			profile: this.store.findRecord('profile', userid),
			// invites: this.store.findAll('friend-invitation'),
			// compliments: this.store.query('compliment',{to: userid, per_page: 1, page: 1}),
			questions: this.store.query('ask',{ userid: userid, per_page: 1, page:1 }),
      toQuestions: this.brydgeScroller('ask',{
				to: userid,
				status: 'accepted',
				modelPath: 'controller.model.toQuestions',
				scroller: 'toQuestions'
			}),
			fromQuestions: this.brydgeScroller('ask',{
				from: userid,
				status: 'accepted',
				modelPath: 'controller.model.fromQuestions',
				scroller: 'fromQuestions'
			}),

    });
	}
});
