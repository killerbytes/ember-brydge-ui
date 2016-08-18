import Ember from 'ember';

export function initialize(application) {
  var test = Ember.Object.extend({
    testing(msg){
      console.log('testing', msg)
    }
  });
  application.register('test:main', test);
  application.inject('route', 'tester', 'test:main');


}

export default {
  name: 'tester',
  initialize
};
