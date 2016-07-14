import Ember from 'ember';
import FilterDropdownListMixin from 'web/mixins/filter-dropdown-list';

export default Ember.Route.extend(FilterDropdownListMixin, {
	ajax: Ember.inject.service(),
	model(){
		var userid = '2zd33na16gv';
		// return this.store.query('experience',{userid: '2zd33na16gv'})
		// return this.get('ajax').request('v2/profiles/2zd33na16gv');
    return Ember.RSVP.hash({
      categories: $.getJSON('data/categories.json'),
      favorites: this.store.findAll('favoriteindustry'),
      profile: this.store.findRecord('profile', '3ze5n8glm6b')
    });
	},
	actions: {
		add(){
			this.get('store')
				.createRecord('favoriteindustry', {
						code: '10102',
						userid: '2zd33na16gv',
						name: 'Oil & Gas'
					})
				.save();


		},
		onIndustrySelect(items){
			this.get('controller.model.favorites').forEach(function(i){
				i.destroyRecord()
			})
			_.each(items, i=>{
				this.get('store').createRecord('favoriteindustry', {
					code: i.code,
					name: i.name,
					userid: '2zd33na16gv'
				}).save();
			})
		},
		delete(item){
			item.destroyRecord();
		},
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
