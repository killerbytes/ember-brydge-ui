import Ember from 'ember';
import ComplimentTitlesMixin from 'web/mixins/compliment-titles';
import FilteredComplimentsMixin from 'web/mixins/filtered-compliments';

export default Ember.Controller.extend(
	ComplimentTitlesMixin, 
	FilteredComplimentsMixin, {
  compliment: Ember.inject.service(),
	compliments: Ember.computed('complimentTitle', 'model.toCompliments', function(){
		var selected = this.get('complimentTitle');
		if(!selected || selected == 'All'){
			return this.get('toAccept');			
		}else{
			return this.get('toAccept').filterBy('title', this.get('complimentTitle'));
		}
	}),

	complimentFilter: [],
  formComplimentTitle: Ember.computed('', function(){
  	return this.get('titles.firstObject');
  }),

  actions: {
    postCompliment(){      
      var userid = this.get('model.profile.id')
      var title = this.get('formComplimentTitle');
      var content = this.get('complimentContent');
      this.get('compliment').post(userid, title, content)
      .then((res)=>{
        this.set('complimentContent', null);
      })
    }
  }

});