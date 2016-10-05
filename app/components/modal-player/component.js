import Ember from 'ember';

export default Ember.Component.extend({
	didInsertElement(){
    this._super(...arguments);
    Ember.run.later(()=>{
      Ember.$(`#${this.get('name')}`).on('open.zf.reveal', ()=>{
				this.set('width', Ember.$(`#${this.get('name')}`).width());
				this.set('height', Ember.$(`#${this.get('name')}`).height());
				if(this.get('emberYoutube.player')) this.get('emberYoutube.player').playVideo();
      })
			Ember.$(`#${this.get('name')}`).on('closed.zf.reveal', ()=>{
				if(this.get('emberYoutube.player')) this.get('emberYoutube.player').pauseVideo();
      })
    })
  },
	// willDestroyElement(){
	// 	$('#dialog-box-' + this.get('name') + '-' + this.get('item.id')).parent().remove();
	// },
	// _close(){
	// 	$('#dialog-box-' + this.get('name') + '-' + this.get('item.id')).foundation('close');
	// },
	// actions: {
  //   submit(cb){
	// 		this.sendAction('submit', this.get('item'));
	// 		this._close();
  //   }
	// }
});
