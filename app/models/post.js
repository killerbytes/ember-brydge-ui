import DS from 'ember-data';

export default DS.Model.extend({
  title: DS.attr('string'),
  content: DS.attr('string'),
  link: DS.attr(),
  shortid: DS.attr(),
  score: DS.attr('number'),
  createdAt: DS.attr('date'),
  updatedAt: DS.attr('date'),
  user: DS.belongsTo('user'),
  profile: DS.belongsTo('profile'),
  categories: DS.attr(),
  sharedPostid: DS.attr(),
  previewImage: Ember.computed('image', 'screenshot', function(){
    if (this.get('image') === undefined) return `${this.get('screenshot') || 'assets/undefined.png'}`;
    return `${this.get('image') || 'assets/undefined.png'}`;
  })
});
