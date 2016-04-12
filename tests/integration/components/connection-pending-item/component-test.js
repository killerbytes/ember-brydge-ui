import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('connection-pending-item', 'Integration | Component | connection pending item', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{connection-pending-item}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#connection-pending-item}}
      template block text
    {{/connection-pending-item}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
