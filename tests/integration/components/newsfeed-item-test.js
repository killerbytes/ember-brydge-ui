import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('newsfeed-item', 'Integration | Component | newsfeed item', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });"

  this.render(hbs`{{newsfeed-item}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:"
  this.render(hbs`
    {{#newsfeed-item}}
      template block text
    {{/newsfeed-item}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
