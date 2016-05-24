import Ember from 'ember';

export default Ember.Route.extend({
  beforeModel() {
    this._super(...arguments);
    return this.get('sessionAccount.account'); // needed to make sure sessionAccount is full realized
  },
  model(params) {
    const userid = params.user_id;
    const newsfeedid = params.newsfeed_id;
    return this.store.find('newsfeed', newsfeedid);
  },
   afterModel: function(model) {
  	console.log('afterModel', model.get('id'));
  	var postid = model.get('id');

    var post = this.store.peekRecord('newsfeed', postid);

    this.store.query('comment',postid).then((comments)=>{
      console.log('<<<<<<', comments)
      post.set('comments', comments);
    })


    //console.log(this.$('#comment-form-'+postid))

    //var $commentform = this.$('#comment-form-'+postid+' input');
  }
});
