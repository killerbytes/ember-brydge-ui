import Ember from 'ember';

export default Ember.Service.extend({
  store: Ember.inject.service(),
  categories: [],
  // selectPost(post){
  //   console.log(post)
  //   this.set('selected', post);
  // },
  submit: function(cb){
    var sharedPostid = this.get('post.sharedPostid') || this.get('post.id');
    return this.get('store').createRecord('newsfeed', {
      content: this.get('valueText'),
      categories: this.get('categories'),
      sharedid: sharedPostid
    }).save()
  }

});
