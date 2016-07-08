import Ember from 'ember';

export default Ember.Component.extend({
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

				  this.$('#industry-tab-'+ this.get('name')).foundation('selectTab', $('#'+ this.get('name') + '-' + item.code));
					break;
				case "2":
					this.set('group', item);
				  this.$('#industry-tab-'+ this.get('name')).foundation('selectTab', $('#'+ this.get('name') + '-' + item.code));
					break;
				case "3":
					this.set('industry', item)
				  this.$('#industry-tab-'+ this.get('name')).foundation('selectTab', $('#'+ this.get('name') + '-done'));
					break;
			}
		},
		select(item){
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