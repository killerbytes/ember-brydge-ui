export default function() {

  this.get('/conversations', function(db, request) {
    return {
      data: db.conversations.map(attrs => (
        {
          type: 'conversations',
          id: attrs.id,
          attributes: attrs
        }
      ))
    };
  });

  this.get('/conversations/:id', function(db, request) {
    let conversation = db.conversations.find(request.params.id);
    let messages = db.messages.where({conversation: request.params.id});

    let data = {
      type: 'conversation',
      id: request.params.id,
      attributes: conversation,
      relationships: {
        messages: {
          data: messages.map(attrs => ({
            type: 'messages',
            id: attrs.id,
            attributes: attrs
          }))
        }
      }
    }

    return { data };
  });

  this.get('/messages/:id', function(db, request) {
    let message = db.messages.find(request.params.id);

    let data = {
      type: 'message',
      id: request.params.id,
      attributes: message
    }

    return { data };
  });

  //this.post('/messages');

  this.post('/messages', function(db, request) {
    var params = JSON.parse(request.requestBody);


    var payload = params.data.attributes;

    var message = db.messages.insert({
      from_id: payload.from_id,
      to_id: payload.to_id,
      content: payload.content
    });

    let conversation = db.conversations.find( payload.to_id);


    if(conversation) {
      conversation.messages.push(message.id);

      db.conversations.update(conversation.id, { messages: conversation.messages});
      db.messages.update(message.id, { conversation: conversation.id});

    }else {
      var c = db.conversations.insert({
        id: payload.to_id,
        from_id: payload.to_id,
        messages:[]
      });

       var _messages = [];
      _messages.push(message.id);

      db.conversations.update(c.id, { messages: _messages});
      db.messages.update(message.id, { conversation: c.id});

    }

    let data = {
      type: 'message',
      id: message.id,
      attributes: message
    }

    return { data };

    //let conversation = db.conversations.find(params.conversation);
    //conversation.messages.push()
  });

}

/*
You can optionally export a config that is only loaded during tests
export function testConfig() {

}
*/
