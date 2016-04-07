import Ember from 'ember';

export default Ember.Controller.extend({
  fullName: 'Hein Zeya',
  
  itChanged: function() {
    console.log('itChanged');
  }.observes('fullName'),

  actions:{
  	fileLoaded: function(){
  		console.log(this.get('file'));
  	}
  }
});
