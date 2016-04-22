import Ember from 'ember';
import _ from 'lodash/lodash';

export default Ember.Component.extend({
	classNames: ['share-box'],
  
  categories: [],
  categoriesLabels: [],

  broadcastList: '',

	actions: {
    post() {
      console.log('<<< post feed from (Home => Component)', this.get('postContent'));
      this.sendAction('postFeed', this.get('postContent'), this.categories);
      this.set('postContent', null);
    },
    cancel() {
      console.log("Cancel: clear the form", this.get('postContent'));
      this.set('postContent', '');
    },
    checkboxChanged: function(value, checked, text) {
      console.log('<<< share-box component <<<', value, checked, text);
      
      if(checked) {
        console.log('push')
        this.categories.push(value);
        this.categoriesLabels.push(text);
      }else{
        console.log('remove');
        this.categories = _.remove(this.categories, function(n) {
          return n !== value;
        });

        this.categoriesLabels = _.remove(this.categoriesLabels, function(n) {
          return n !== text;
        });
      }
      
      //this.broadcastList =  this.categories.join(' ');

      var s = (this.categoriesLabels.length >0) ? ','+ this.categoriesLabels.join(' , '): this.categoriesLabels.join(' , ');
      this.set('broadcast',s);

      console.log(s);
      console.log(this.categories);
    },
  }
});
