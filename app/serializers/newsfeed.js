import DS from 'ember-data';

export default DS.JSONAPISerializer.extend({

  keyForAttribute: function(attr) {
    // console.log('<<<<<<< Profile keyForAttribute <<<<<<<<<')
    return Ember.String.underscore(attr);
  }

});
