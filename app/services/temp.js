import Ember from 'ember';

/**
 * Store stuff temporary.
 * Ember.inject.service('temp');
 * this.get('temp').set('something', val);
 * this.get('temp').getAndRemove('something');
 * 
 * @param  {[type]} {               getAndRemove: function (key [description]
 * @return {[type]}   [description]
 */
export default Ember.Service.extend({
  getAndRemove: function (key) {
    var obj = this.get(key);
    if (obj !== undefined) {
      this.set(key, undefined);
    }
    return obj;
  }
});
