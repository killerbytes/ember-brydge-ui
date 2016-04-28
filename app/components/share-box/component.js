import Ember from 'ember';
import _ from 'lodash/lodash';

export default Ember.Component.extend({
	classNames: ['share-box', 'mb'],
  categories: [],
  didInsertElement: function(){
    this.set('categories', [])
  },
	actions: {
    post() {
      this.sendAction('postFeed', this.get('postContent'), _.map(this.get('categories'), 'id'));
      this.set('postContent', null);
    },
    cancel() {
      this.set('postContent', '');
    },
    checkboxChanged: function(value, checked, text) {
      if(checked) {
        this.categories.pushObject({id: value, text: text});
      }else{
        var list = this.categories.toArray();
        _.remove(list, {id: value })
        this.set('categories', list);
      }
    },
  }
});
