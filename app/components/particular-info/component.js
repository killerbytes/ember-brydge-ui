import Ember from 'ember';
import GetCountryListMixin from 'web/mixins/get-country-list';

export default Ember.Component.extend(GetCountryListMixin,{
	flashMessages: Ember.inject.service(),

	actions: {
		save: function () {
			this.get('profile').save().then(()=>{
				Ember.get(this, 'flashMessages').success('Success!');
			});
		},
		fileLoaded: function(file){
      console.log('particular info Component=>',file);
    }
	}
});
