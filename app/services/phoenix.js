import Ember from 'ember';
import {Socket} from "phoenix";

export default Ember.Service.extend({
  socket: function () {
    let s = new Socket("ws://localhost:8000/socket");
    s.connect();
    return s;
  }
});
