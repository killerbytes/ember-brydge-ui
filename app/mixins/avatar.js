import Ember from 'ember';

export default Ember.Mixin.create({
  ajax: Ember.inject.service(),
  actions: {
    fileLoaded: function(formData){
      return this.get('ajax').request('/v2/profile/avatar', {
        method: 'POST',
        data: formData,
        contentType: false,
        processData: false,
      }).then((res)=>{
        this.set('profile.avatarUrl',res.data.attributes.avatar_url);
      })
    }
  }
});
