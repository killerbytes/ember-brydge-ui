import Ember from 'ember';

export default Ember.Service.extend({
	ajax: Ember.inject.service(),
	store: Ember.inject.service(),
  session: Ember.inject.service('session'),
	create(userid, question){
		return this.get('store').createRecord('ask',{
			userid: userid,
			question: question
		}).save();

	},

  hide(item){
		item.set('status', 'archive');
		return item.save();
    // var userid = this.get('session.data.authenticated.user_id');
    // var url = '/v2/asks/'+id;
    // var data = { ask: {status: "archive", userid: userid}};
		//
    // this.get('ajax').request(url, {
    //   method: 'PATCH',
    //   data: data
    // }).then((res)=>{
    //   this.get('store').push({data: res});
    // });
  },
  delete(item){
		item.destroyRecord();
  //   var url = '/v2/asks/'+id+'/delete';
  //   this.get('ajax').request(url, {
  //     method: 'POST'
  //   }).then((res)=>{
  //   	this.get('store').push({data: res});
  //   });
  }

});
