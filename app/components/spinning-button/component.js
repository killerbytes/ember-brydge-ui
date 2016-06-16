import Ember from 'ember';

export default Ember.Component.extend({
	tagName: 'a',

	//attributeBindings: [ 'disabled', 'title'],

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

  timeOut: 1000,

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
  
  click: function() {

    let _this = this;

    if (!this.get('isSpinning')) {
      this.set('isSpinning', true);
      this.set('disabled', true);

      // if(this.get('action')) {
      //   this.sendAction( 'action', function(){
      //     console.log('callback');

      //     //
      //     // add delay after callback
      //     //
      //     Ember.run.later((function() {
      //       _this.set('isSpinning', false);
      //       _this.set('disabled', false);
      //     }), _this.get('timeOut'));
      //   });
      // }
      this.sendAction('clicked', (value)=>{
        this.set('isSpinning', false);
        this.set('disabled', false);
        console.log(value)
      })

      // if (typeof this.get('onclick') === 'function') {
      //   this.get('onclick')();
      // }
    }
  }
});
