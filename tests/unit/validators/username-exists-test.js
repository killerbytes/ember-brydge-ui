import { moduleFor, test } from 'ember-qunit';

moduleFor('validator:username-exists', 'Unit | Validator | username-exists', {
  needs: ['validator:messages']
});

test('it works', function(assert) {
  var validator = this.subject();
  assert.ok(validator);
});
