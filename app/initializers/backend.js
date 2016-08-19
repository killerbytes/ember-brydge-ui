import {Socket} from "phoenix";

export function initialize(application) {
	// let a = application.get('session.data.authenticated');
	// console.log(a)
  let socket = new Socket("ws://localhost:8000/ws");
  socket.connect({"token": "c5075fa0643c11e6b0da985aeb89a4c0"})
  
  // let chan = socket.chan("rooms:lobby", {});
  // chan.join().receive("ok", chan => {
  //   console.log("Welcome to Phoenix Chat!");
  // });
}

export default {
  name: 'backend',
  initialize: initialize
};