import Ember from 'ember';
export default Ember.Component.extend({
  months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
  actions: {
    change(){
      console.log('change', arguments)
    }
  }
});
