import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  session: Ember.inject.service(),
  actions: {
    // didTransition(){
    //   Ember.run.later(()=>{
    //     console.log('didTransition',this.get('session.data.authenticated.user_id'))
    //     window.history.replaceState( {} , 'me', this.get('session.data.authenticated.user_id') );
    //   })
    // }

  }
});
