import Ember from 'ember';
import _ from 'lodash/lodash';

export default Ember.Component.extend({
	classNames: ['share-box'],
  
  categories: [],

	actions: {
    post() {
      console.log('<<< post feed from (Home => Component)', this.get('postContent'));
      this.sendAction('postFeed', this.get('postContent'), this.categories);
    },
    cancel() {
      console.log("Cancel: clear the form", this.get('postContent'));
      this.set('postContent', '');
    },
    checkboxChanged: function(value, checked) {
      console.log('<<< share-box component <<<', value, checked);
      if(checked) {
        console.log('push')
        this.categories.push(value);
      }else{
        console.log('remove');
        this.categories = _.remove(this.categories, function(n) {
          return n !== value;
        });
      }
      
      console.log(this.categories);
    },
  }
});
