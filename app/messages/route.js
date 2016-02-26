import Ember from 'ember';

var messages = [{
	id: 1,
	shortContent: 'Hey Jon, I thought you should take a look at this.',
	by: 'Kaith',
	when: '26 Feb',
	avatar: 'http://instakook-dev.s3.amazonaws.com/15.png'
},{
	id: 2,
	shortContent: 'Hi, How are you?',
	by: 'John',
	when: '23 Feb',
	avatar: 'http://instakook-dev.s3.amazonaws.com/11.glasses.png'
}];

export default Ember.Route.extend({
	model() {
    return messages;
  }
});
