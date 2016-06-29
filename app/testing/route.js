import Ember from 'ember';
import FilterDropdownListMixin from 'web/mixins/filter-dropdown-list';

export default Ember.Route.extend(FilterDropdownListMixin, {
	ajax: Ember.inject.service(),
	model(){
		// return this.store.query('experience',{userid: '2zd33na16gv'})
		// return this.get('ajax').request('v2/profiles/2zd33na16gv');
    return Ember.RSVP.hash({
      profile: this.store.findRecord('profile', '3ze5n8glm6b')
    });
	},
	actions: {
		toggle(){
			console.log('toggle')
			$('#test')
			$('#test').foundation('toggle', $('#test .accordion-content'))
		},
		setChannel(id){
			if(id == 0){
				this.controller.set('channels', null)
			}else{
				this.controller.set('channels', id)
			}
		},
		setLocation(location){
			if(location == "Everywhere"){
				this.controller.set('location', null)
			}else{				
      	this.controller.set('location', location);
			}
		}

	}
});
