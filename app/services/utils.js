import Ember from 'ember';

export default Ember.Service.extend({
  insertParagraph(text){
    return text.split("\n").join("<br />");
  }
});

