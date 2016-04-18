import Ember from 'ember';

export default Ember.Component.extend({
	ajax: Ember.inject.service(),
	connection: Ember.inject.service(),

	actions: {
	
		reject: function ( targetid ) {
			console.log('targetid =>', targetid);

			var ctx = this;
			// var url = '/v1/connections/'+targetid+'/reject';

			this.get('connection').reject(targetid)
			// return this.get('ajax').request(url,{
			// 	method: 'POST'
			// })
			.then((res) =>{
				console.log(res);

				var connection = ctx.store.peekRecord('connection', res.data.id);
				console.log('connection =>', connection);
				connection.set('status','reject');
				ctx.sendAction('resp');
			});
		}
	}
});
