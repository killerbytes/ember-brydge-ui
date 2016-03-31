import Ember from 'ember';

export default Ember.Component.extend({
	tagName: 'button',

	classNames: ['button','large','connect'],

	attributeBindings: [ 'disabled', 'title'],

	isSpinning: false,

	disabled: false,

	lines: 8,

  radius: 5,

  length: 4,

  width: 3,

  corners: 1,

  rotate: 0,

  direction: 1,

  speed: 1,

  trail: 60,

  shadow: false,

  hwaccel: false,

  color: null,

  left: '50%',

  top: '50%',

	setPositionToRelative: Ember.on('didInsertElement', function () {
    this.$().css('position', 'relative');
  }),

  maintainButtonDimensions: Ember.on('didInsertElement', Ember.observer('isSpinning', function () {
    if (this.get('isSpinning')) {
      this.$().css({
        'width': this.$().outerWidth() +'px',
        'height': this.$().outerHeight() +'px'
      });
    } else {
      this.$().css({
        'width': '',
        'height': ''
      });
    }
  })),

	click() {
		let _this = this;
		if (!this.get('isSpinning')) {
			this.set('isSpinning', true);
			this.set('disabled', true);

			if(this.get('action')) {
				this.sendAction( 'action', function(){
					console.log('callback')
					Ember.run.later((function() {
					  //do something in here that will run in 2 seconds
					  _this.set('isSpinning', false);
					  _this.set('disabled', false);
					}), 5000);
				});
			}
		}
	}
});
