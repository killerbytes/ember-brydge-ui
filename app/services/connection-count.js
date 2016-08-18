import Ember from 'ember';

export default Ember.Service.extend({
  store: Ember.inject.service(),
  count(){
    this.get('store').query('connection', {userid: this.get('userid')}).then(res=>{
      if(this.get('isDestroyed') || this.get('isDestroying')) return false;
      this.set('connections', res);
      this._poll();
    })
  }
});
