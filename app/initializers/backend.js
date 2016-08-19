import {Socket} from "phoenix";

export function initialize(application) {
	// let a = application.get('session.data.authenticated');
	// console.log(a)
  let socket = new Socket("ws://localhost:8000/ws",{params: {token: "fb16401a651e11e69211985aeb89a4c0"}});
  socket.connect();
  // let chan = socket.chan("rooms:lobby", {});
  // chan.join().receive("ok", chan => {
  //   console.log("Welcome to Phoenix Chat!");
  // });
}

export default {
  name: 'backend',
  initialize: initialize
};