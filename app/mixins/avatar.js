import Ember from 'ember';

export default Ember.Mixin.create({
  ajax: Ember.inject.service(),
  flashMessages: Ember.inject.service(),
  actions: {
    fileLoaded: function(formData){
      console.log('particular info Component=>');

      return this.get('ajax').request('/v2/profile/avatar', {
        method: 'POST',
        data: formData,
        contentType: false,
        processData: false,
      }).then((res)=>{
        console.log(res);
        this.get('profile').set('avatarUrl',res.data.attributes.avatarUrl);
      })
    }
  }
});
