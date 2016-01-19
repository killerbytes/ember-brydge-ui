import Ember from 'ember';

export default Ember.Route.extend({

  model() {
    return this.store.findAll('industry-category');
  },

  actions: {
    saveCategory(nm, desc) {
      const {name, description} = this.getProperties('name', 'description');
      console.log("Saving category", name, description);
      console.log(this.get('controller.name'));
      console.log(nm, desc);
    }
  }
});
