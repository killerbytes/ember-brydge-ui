import Ember from 'ember';

export default Ember.Component.extend({
	ajax: Ember.inject.service(),

	actions: {
		accept: function( targetid ) {
			console.log('targetid=>', targetid);
			if(targetid === undefined) return;

			var ctx = this;
			var url = '/v1/connections/'+targetid+'/accept';

			return this.get('ajax').request(url,{
				method: 'POST'
			}).then((res) =>{
				console.log(res);

				var connection = ctx.store.peekRecord('connection', res.data.id);
				console.log('connection =>', connection);
				connection.set('status','accept');
				//connection.reload();
				//ctx.get('target.router').refresh();
				ctx.sendAction('resp');
			});
		}
	}
});
