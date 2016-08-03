import DS from 'ember-data';

export default DS.Model.extend({
  accept: DS.attr(),
  answer: DS.attr(),
  ask: DS.attr(),
  comment: DS.attr(),
  compliment: DS.attr(),
  message: DS.attr(),
  request: DS.attr(),
  share: DS.attr(),
  userid: DS.attr(),
  vote: DS.attr(),
  // action: DS.attr(),
  // content: DS.attr(),
  // createdAt: DS.attr(),
  // read: DS.attr(),
  // type: DS.attr(),
  // user: DS.belongsTo('user'),
  // target: DS.belongsTo('user'),
  // targetid: DS.attr(),
  // shortid: DS.attr()
});
