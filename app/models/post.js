import DS from 'ember-data';

export default DS.Model.extend({
  title: DS.attr('string'),
  siteName: DS.attr(),
  site: DS.attr(),
  image: DS.attr(),
  content: DS.attr('string'),
  link: DS.attr(),
  shortid: DS.attr(),
  score: DS.attr('number'),
  createdAt: DS.attr('date'),
  updatedAt: DS.attr('date'),
  user: DS.belongsTo('user'),
  username: DS.attr(),
  profile: DS.belongsTo('profile'),
  categories: DS.attr(),
  sharedPostid: DS.attr(),
  sharedPost: DS.belongsTo('newsfeed', {inverse: null}),
  previewImage: Ember.computed('image', 'screenshot', function(){
    if (this.get('image') === undefined) return `${this.get('screenshot') || 'assets/undefined.png'}`;
    return `${this.get('image') || 'assets/undefined.png'}`;
  })
});
