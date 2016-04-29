import Ember from 'ember';

export default Ember.Route.extend({
	session: Ember.inject.service('session'),
  username: null,

	model: function(params) {  
    this.username = params.username;
    return this.store.findRecord('public-profile', params.username);
  },

  afterModel: function(model, transaction) {
  	// let _this = this;
   //  console.log(this)
  	// get current user id
  	// let ownerid = this.get('session.data.authenticated.user_id');
  	// _this.set('ownerid', ownerid);

  	// get ask user id
  	// let userid = model.get('userid');
  	// _this.set('userid', userid);

    // return Ember.RSVP.hash({
    //   fromQuestions: this.store.query('ask',{from: userid, userid: userid}),
    //   toQuestions: this.store.query('ask',{to: userid, userid: userid})
    // }).then((result)=>{
    //   console.log(this.controller)
    //   _this.set('fromQuestions',result.fromQuestions);
    //   _this.set('toQuestions', result.toQuestions);
    // });


    // return Ember.RSVP.hash({
    //   questions: this.store.query('ask',{userid: userid}).then(function(asks){
    //      return asks.filterBy('answer');
    //   })
    // }).then(function(result){
      
    //   result.questions.forEach(function(item){
    //     console.log('Qust => ',item.get('content'));
    //     console.log('From =>',item.get('from').get('name'));
    //     console.log('Ans =>', item.get('answer'));
    //     console.log('---------------')
    //   });

    //   //_this.set('trendingPosts',result.trendingPosts);
    //   //_this.set('lastestQuestion', result.questions.get('firstObject'));
    // });
  },

  setupController: function(controller, model) {
    this._super(...arguments)
		// controller set the neccessary items 
    let userid = model.get('userid');

    Ember.RSVP.hash({
      fromQuestions: this.store.query('ask',{from: userid, userid: userid}),
      toQuestions: this.store.query('ask',{to: userid, userid: userid})
    }).then((result)=>{
      controller.setProperties(result)
      // _this.set('fromQuestions',result.fromQuestions);
      // _this.set('toQuestions', result.toQuestions);
    });
    
    let ownerid = this.get('session.data.authenticated.user_id');
    controller.set('ownerid', ownerid);
    console.log(controller)
    // controller.setProperties(this);
	  // controller.set('model',{
   //    username: this.username,
	  // 	ownerid: this.get('ownerid'),
	  // 	userid: this.get('userid'),
	  // 	fromQuestions: this.get('fromQuestions'),
   //    toQuestions: this.get('toQuestions')
	  // });
	}
});
