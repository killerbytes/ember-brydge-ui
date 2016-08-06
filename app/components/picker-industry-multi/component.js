import Ember from 'ember';

export default Ember.Component.extend({
	// list: Ember.computed('categories.@each.categories.@each.industries.@each.data',function(){
	// 	console.log('computed')
	// 	return this.get('categories');
	// }),
	limit: 10,
	cap: Ember.computed('selected.length', function(){
		console.log(this.get('selected').length, this.get('limit'))
		return this.get('selected').length >= this.get('limit') ;
	}),
	actions: {
		remove(item){
			this.get('selected').removeObject(item)
		},
		goto(index, item){
			switch(index){
				case "0":
				  this.$('#industry-tab-'+ this.get('name')).foundation('selectTab', $('#'+ this.get('name') + '-root'));
					break;
				case "1":
					this.set('sector', item);

				  this.$('#industry-tab-'+ this.get('name')).foundation('selectTab', $('#'+ this.get('name') + '-' + item.sector_id));
					break;
				case "2":
					this.set('group', item);
				  this.$('#industry-tab-'+ this.get('name')).foundation('selectTab', $('#'+ this.get('name') + '-' + item.industry_id));
					break;
				case "3":
					this.set('industry', item)
				  this.$('#industry-tab-'+ this.get('name')).foundation('selectTab', $('#'+ this.get('name') + '-done'));
					break;
			}
		},
		select(item){
			if(this.get('cap')) return false;
			if(!this.get('selected')) this.set('selected', []);

			this.get('selected').pushObject({
				code: item.data.code,
				name: item.data.subIndustry
			});
		},
		submit(){
			this.$().parents('.reveal:first').foundation('close');
			this.sendAction('onSelect', this.get('selected'));
		}
	}
});
