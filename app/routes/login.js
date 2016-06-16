import Ember from 'ember';
import UnauthenticatedRouteMixin from 'ember-simple-auth/mixins/unauthenticated-route-mixin';

export default Ember.Route.extend(UnauthenticatedRouteMixin, {
  renderTemplate(){
    this._super();
    Ember.run.later(()=>{
      $('.equalizer').foundation();
    })
  }

});
