import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('typehead-industry-search', 'Integration | Component | typehead industry search', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{typehead-industry-search}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#typehead-industry-search}}
      template block text
    {{/typehead-industry-search}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
