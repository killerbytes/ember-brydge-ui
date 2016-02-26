import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('newsfeed-list', 'Integration | Component | newsfeed list', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });"

  this.render(hbs`{{newsfeed-list}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:"
  this.render(hbs`
    {{#newsfeed-list}}
      template block text
    {{/newsfeed-list}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
