import Ember from 'ember';
import FiltertableMixin from 'web/mixins/filtertable';
import { module, test } from 'qunit';

module('Unit | Mixin | filtertable');

// Replace this with your real tests.
test('it works', function(assert) {
  let FiltertableObject = Ember.Object.extend(FiltertableMixin);
  let subject = FiltertableObject.create();
  assert.ok(subject);
});
