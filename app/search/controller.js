import Ember from 'ember';
import QueryLocationMixin from 'web/mixins/query-locations';

export default Ember.Controller.extend(QueryLocationMixin, {
  search: Ember.inject.service(),
  cities: [],
  actions: {
  	citySelected(location){
  		this.set('valueText', {text: location.city})
  		this.set('selectedCity', location.city)
  	},
  	addCity(){
  		this.get('cities').pushObject(this.get('selectedCity'))
  		this.set('selectedCity', null);
  		this.set('valueText', null)
  	}
  }
});
