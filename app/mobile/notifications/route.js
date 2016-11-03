import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import RouterClassNamesMixins from 'web/mixins/route-class-names';


export default Ember.Route.extend(
  RouterClassNamesMixins,
  AuthenticatedRouteMixin, {
  className: 'main-mobile'
});
