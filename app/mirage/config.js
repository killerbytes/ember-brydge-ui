export default function() {

  // this.get('/conversations', function(db, request) {
  //   return {
  //     data: db.conversations.map(attrs => (
  //       { 
  //         type: 'conversations', 
  //         id: attrs.id, 
  //         attributes: attrs
  //       }
  //     ))
  //   };
  // });

  // this.get('/conversations/:id', function(db, request) {
  //   let conversation = db.conversations.find(request.params.id);
  //   let messages = db.messages.where({conversation: request.params.id});

  //   let data = {
  //     type: 'conversation',
  //     id: request.params.id,
  //     attributes: conversation,
  //     relationships: {
  //       messages: {
  //         data: messages.map(attrs => ({ 
  //           type: 'messages', 
  //           id: attrs.id, 
  //           attributes: attrs
  //         }))
  //       }
  //     }
  //   }

  //   return { data };
  // });

  // this.get('/messages/:id', function(db, request) {
  //   let message = db.messages.find(request.params.id);

  //   let data = {
  //     type: 'message',
  //     id: request.params.id,
  //     attributes: message
  //   }

  //   return { data };
  // });

  //this.post('/messages');
}

/*
You can optionally export a config that is only loaded during tests
export function testConfig() {

}
*/
