import Ember from 'ember';

export default Ember.Service.extend({
  store: Ember.inject.service(),
  categories: [],
	selected: Ember.computed('post', function() {
    return this.get('post');
  }),
  selectPost(post){
    this.set('post', post);
  },
  submit: function(){
    return this.get('store').createRecord('post', {
      content: this.get('valueText'),
      categories: _.map(this.get('categories'), 'id'),
      sharedPostid: this.get('selected.id')
    }).save();
  }

});

