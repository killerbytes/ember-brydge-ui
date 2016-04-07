import Ember from 'ember';
import SpinningButton from 'web/components/spinning-button/component';

export default SpinningButton.extend({
  classNames: ['button','large','connect'],
  attributeBindings: ['disabled']
});
