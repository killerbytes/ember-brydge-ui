import Ember from 'ember';

import {Socket} from "web/utils/phoenix";

export default Ember.Service.extend({
  socket: function () {
    let s = new Socket("ws://localhost:3000/socket");
    s.connect();
    return s;
  }
});
