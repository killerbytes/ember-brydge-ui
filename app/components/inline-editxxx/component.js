import Ember from 'ember';

export default Ember.Component.extend({
  editing: false,
  actions: {
    startEditing: function() {
      return this.toggleProperty("editing");
    },
    stopEditing: function() {
      this.toggleProperty("editing");
      if (this.get("isDirty")) {
        return this.get("content").save();
      }
    },
    cancelEditing: function() {
      this.toggleProperty("editing");
      return this.get("name");
    }
  }
});