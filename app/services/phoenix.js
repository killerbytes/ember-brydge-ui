import Ember from 'ember';
import {Socket} from "phoenix";
import ENV from 'web/config/environment';

export default Ember.Service.extend({
  session: Ember.inject.service(),
  socket: function () {
    let token = this.get('session.data.authenticated.access_token')
    // let host = ENV['ember-simple-auth'].authorizerHost;
    // let s = new Socket("ws://localhost:8000/socket",{params: {token: token}});
    let s = new Socket("wss://api.brydge.me:8000/socket",{params: {token: token}});
    s.connect();
    return s;
  },

  channel: function () {
  	let room = this.socket().channel("room:lobby", {});
  
    room.join().receive("ok", () => {
      console.log("Welcome to Phoenix Websocket!");
    });
    return room;
  }
});
