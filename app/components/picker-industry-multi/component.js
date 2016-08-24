import Ember from 'ember';
import _ from 'lodash/lodash';

export default Ember.Component.extend({
	willDestroyElement(){
    if(this.$('.has-tip').length != 0) this.$('.has-tip').foundation('destroy');
	},
	limit: 10,
	cap: Ember.computed('selected.length', function(){
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
			if(_.find(this.get('selected'), {code: item.data.code})) return false;
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
