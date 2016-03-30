import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('channel-filter-dropdown', 'Integration | Component | channel filter dropdown', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{channel-filter-dropdown}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#channel-filter-dropdown}}
      template block text
    {{/channel-filter-dropdown}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
