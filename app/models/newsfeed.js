import DS from 'ember-data';

export default DS.Model.extend({
  title: DS.attr(),
  content: DS.attr(),
  summary: DS.attr(),
  link: DS.attr(),
  shortid: DS.attr(),
  url: DS.attr(),
  image: DS.attr(),
  siteName: DS.attr(),
  screenshot: DS.attr(),
  score: DS.attr('number'),
  createdAt: DS.attr('date'),
  updatedAt: DS.attr('date'),
  user: DS.belongsTo('user'),
  previewImage: Ember.computed('image', 'screenshot', function(){
    if (this.get('image') === undefined) return `${this.get('screenshot') || 'assets/undefined.png'}`;
    return `${this.get('image') || 'assets/undefined.png'}`;
  }),
  vote: DS.belongsTo('vote',{async: true}),
  commentCount: DS.attr(),
  comments: DS.hasMany('comment',{async: true})
});
