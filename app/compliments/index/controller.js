import Ember from 'ember';
import ComplimentTitlesMixin from 'web/mixins/compliment-titles';

export default Ember.Controller.extend(ComplimentTitlesMixin, {
  compliment: Ember.inject.service(),
	limit: 3,
	toAccept: Ember.computed.filterBy('model.toCompliments', 'status', 'accepted'),
	fromAccept: Ember.computed.filterBy('model.fromCompliments', 'status', 'accepted'),
	fromAcceptSidebar: Ember.computed('fromAccept', function(){
		return this.get('fromAccept').slice(0, this.get('limit'));
	}),
	complimentFilter: [],
  formComplimentTitle: Ember.computed('', function(){
  	return this.get('titles.firstObject');
  }),

	complimentTitles: Ember.computed('titles', function(){
		this.get('complimentFilter').push('All');
		return _.concat(this.get('complimentFilter'), this.get('titles'));
	}),
	compliments: Ember.computed('complimentTitle', function(){
		var selected = this.get('complimentTitle');
		if(!selected || selected == 'All'){
			return this.get('toAccept');			
		}else{
			return this.get('toAccept').filterBy('title', this.get('complimentTitle'));
		}
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