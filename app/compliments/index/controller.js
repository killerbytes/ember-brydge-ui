import Ember from 'ember';
import ComplimentTitlesMixin from 'web/mixins/compliment-titles';

export default Ember.Controller.extend(ComplimentTitlesMixin, {
  compliment: Ember.inject.service(),
	limit: 3,
	// toPending: Ember.computed.filterBy('toCompliments', 'status', 'pending'),
	toAccept: Ember.computed.filterBy('model.toCompliments', 'status', 'accept'),
	// fromPending: Ember.computed.filterBy('fromCompliments', 'status', 'pending'),
	fromAccept: Ember.computed.filterBy('model.fromCompliments', 'status', 'accept'),
	// toPendingSidebar: Ember.computed('toPending', function(){
	// 	return this.get('toPending').slice(0, this.get('limit'));
	// }),
	fromAcceptSidebar: Ember.computed('fromAccept', function(){
		return this.get('fromAccept').slice(0, this.get('limit'));
	}),
	complimentFilter: [],
  complimentTitle: Ember.computed('', function(){
  	return this.get('titles.firstObject');
  }),

	complimentTitles: Ember.computed('titles', function(){
		this.get('complimentFilter').push('All');
		console.log(this.get('complimentFilter'))
		return _.concat(this.get('complimentFilter'), this.get('titles'));
	}),
	compliments: Ember.computed('complimentTitle', function(){
		var selected = this.get('complimentTitle');
		console.log(this.get('toAccept'))
		if(!selected || selected == 'All'){
			return this.get('toAccept');			
		}else{
			return this.get('toAccept').filterBy('title', this.get('complimentTitle'));
		}
	}),
  actions: {
    postCompliment(){      
      var userid = this.get('model.profile.id')
      var title = this.get('complimentTitle');
      var content = this.get('complimentContent');
      console.log(this)
      this.get('compliment').post(userid,title,content)
      .then((res)=>{
        console.log('compliment saved');
        this.set('complimentContent', null);
      })
    }
  }

});