import Ember from 'ember';
import GetCountryListMixin from 'web/mixins/get-country-list';

export default Ember.Component.extend(GetCountryListMixin,{
	flashMessages: Ember.inject.service(),
	ajax: Ember.inject.service(),
	actions: {
		save: function () {
			this.get('profile').save().then(()=>{
				Ember.get(this, 'flashMessages').success('Success!');
			});
		},
		fileLoaded: function(formData){
      console.log('particular info Component=>');

      return this.get('ajax').request('/v1/profile/avatar', {
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
