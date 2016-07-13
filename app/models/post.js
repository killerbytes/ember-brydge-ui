import DS from 'ember-data';

export default DS.Model.extend({
  title: DS.attr('string'),
  site_name: DS.attr(),
  site: DS.attr(),
  image: DS.attr(),
  content: DS.attr('string'),
  link: DS.attr(),
  newsfeedid: DS.attr(),
  shortid: DS.attr(),
  score: DS.attr('number'),
  created_at: DS.attr('date'),
  updated_at: DS.attr('date'),
  user: DS.belongsTo('user'),
  // username: DS.attr(),
  profile: DS.belongsTo('profile'),
  categories: DS.attr(),
  sharedPostid: DS.attr(),
  // shareCount: DS.attr(),
  // sharedPost: DS.belongsTo('newsfeed', {inverse: null}),
  previewImage: Ember.computed('image', 'screenshot', function(){
    if (this.get('image') === undefined) return 'assets/undefined.png';
    return `${this.get('image') || 'assets/undefined.png'}`;
  })
});
