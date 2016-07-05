import Ember from 'ember';

export default Ember.Service.extend({
  store: Ember.inject.service(),
  categories: [],
  selectPost(post){
    this.set('selected', post);
  },
  submit: function(cb){
    var sharedPostid = this.get('selected.sharedPostid') || this.get('selected.id');
    return this.get('store').createRecord('post', {
      content: this.get('valueText'),
      categories: _.map(this.get('categories'), 'id'),
      sharedPostid: sharedPostid
    }).save().then(()=>{
      this.set('valueText', null);
      cb.apply();
    });
  }

});

