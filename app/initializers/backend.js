// import {Socket} from "phoenix";

// export function initialize(application) {
// 	console.log('backend')
//   let socket = new Socket("ws://localhost:8000/socket");
//   socket.connect()
  
//   let chan = socket.channel("room:lobby", {});
//   chan.join().receive("ok", chan => {
//     console.log("Welcome to Phoenix Chat!");
//   });
// }

// export default {
//   name: 'backend',
//   initialize: initialize
// };

export function initialize(application) {  
  application.inject('controller', 'phoenix', 'service:phoenix');
};
export default {
  name: 'socket',
  initialize: initialize
};