import Ember from 'ember';

export default Ember.Controller.extend({
  queryParams: ['category'],
  category: 'azid',
  actions: {
  	change: function(){
  		this.set('category', 'sdfsdf')
  	}
  }
});
