import Ember from 'ember';
export default Ember.Controller.extend({  
  messages: [],
  channel: null,
  init: function() {
    let socket = this.get('phoenix').socket();  
    let room = socket.channel("room:lobby", {});
    room.join().receive("ok", () => {
      console.log("Welcome to Phoenix Websocket!");
    });

    room.on( "new:message", msg => this.renderMessage(msg) )
    
    // this.set('channel', room);
    // room.join().receive("ok", () => {
    //   console.log("Welcome to Phoenix Chat!");
    // });
    // room.on( "new:message", msg => this.renderMessage(msg) )
  },
  renderMessage: function (msg) {
    console.log('get new message', msg)
    // this.messages.pushObject(msg.body);
  },
  actions: {
    sendMessage: function (event) {
      let val = this.get('newMessage');
      this.get('channel').push("new:message", {body: val})
      this.set('newMessage', null);
      return false;
      event.preventDefault();
    }
  }
});