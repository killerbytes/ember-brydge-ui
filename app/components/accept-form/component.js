import Ember from 'ember';

export default Ember.Component.extend({
	ajax: Ember.inject.service(),
	connection: Ember.inject.service(),
	actions: {
		accept: function( targetid ) {
			console.log('targetid=>', targetid);
			if(targetid === undefined) return;

			var ctx = this;

			this.get('connection').accept(targetid)
			// var url = '/v1/connections/'+targetid+'/accept';

			// return this.get('ajax').request(url,{
			// 	method: 'POST'
			// })
			.then((res) =>{
				console.log(res);

				var connection = ctx.store.peekRecord('connection', res.data.id);
				console.log('connection =>', connection);
				connection.set('status','accepted');
				//connection.reload();
				//ctx.get('target.router').refresh();
				ctx.sendAction('resp');
			});
		}
	}
});
