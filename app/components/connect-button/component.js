import Ember from 'ember';
import SpinningButton from 'web/components/spinning-button/component';

export default SpinningButton.extend({
	tagName: 'a',
  classNames: ['button','large','connect','success'],
  attributeBindings: ['disabled']
});
