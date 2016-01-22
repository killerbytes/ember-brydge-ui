import Ember from 'ember';

export default Ember.Component.extend({
  session: Ember.inject.service('session'),

  didInsertElement() {
    "use strict";
    this.$(document).foundation();

  },

  actions: {
    logout() {
      var accessToken = this.get('session.data.authenticated.access_token');
      Ember.$.getJSON('http://localhost:8000/expire?token=' + accessToken).done(()=> {
        this.get('session').invalidate();
        console.log("Expired session", accessToken);
      });
    }
  }

});
