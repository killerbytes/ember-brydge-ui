import Ember from 'ember';
import ComplimentTitlesMixin from 'web/mixins/compliment-titles';
import FilteredComplimentsMixin from 'web/mixins/filtered-compliments';

export default Ember.Controller.extend(
	ComplimentTitlesMixin, 
	FilteredComplimentsMixin, {
  compliment: Ember.inject.service(),
	// limit: 3,
	// toAccept: Ember.computed.filterBy('model.toCompliments', 'status', 'accepted'),
	// fromCompliments: Ember.computed.filterBy('model.fromCompliments', 'status', 'accepted'),
	// fromAccept: Ember.computed.filterBy('fromCompliments', 'delete', false),
	// fromAcceptSidebar: Ember.computed('fromCompliments', function(){
	// 	return this.get('fromCompliments')
	// 		.filterBy('delete', false)
	// 		.slice(0, this.get('limit'));
	// }),
	// complimentTitles: Ember.computed('titles', function(){
	// 	this.get('complimentFilter').push('All');
	// 	return _.concat(this.get('complimentFilter'), this.get('titles'));
	// }),
	compliments: Ember.computed('complimentTitle', 'model.toCompliments', function(){
		var selected = this.get('complimentTitle');
		console.log('selected', selected);
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