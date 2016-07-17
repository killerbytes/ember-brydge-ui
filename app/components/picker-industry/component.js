import Ember from 'ember';

export default Ember.Component.extend({
	actions: {
		close(){
			this.$('.industry-picker').foundation('toggle');
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
      // this.$('#industry-tab-'+ this.get('name')).foundation('selectTab', $('[data-id="'+link+'"]'));
    },
    select(item){
    	this.sendAction('onSelect', {
					code: item.data.code,
					name: item.data.subIndustry
				});
			if(this.$().parents('.industry-picker:first')) this.$().parents('.industry-picker:first').foundation('toggle');
    }

	}
});
