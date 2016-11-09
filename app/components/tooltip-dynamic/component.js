import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'div',
  classNames: ['tooltip-dynamic'],
  willDestroyElement(){
		this.get('el').remove();
		this._super(...arguments);
	},
  init(){
    this._buildTooltip();
    this._super(...arguments);
  },
  _buildTooltip(){
    let tooltip = $('<div>');
    tooltip.attr('id', this.get('id'));
    tooltip.addClass('tooltip right tip-dynamic');
    tooltip.text(this.get('text'));
    $('body').append(tooltip);
  },
  _setPosition(e){
    let pos = e.currentTarget.getBoundingClientRect()
    this.get('el').css({
      top: pos.bottom - (pos.bottom - pos.top),
      left: pos.left + pos.width + 5
    })
  },
  _show(){
    this.get('el').fadeIn(150);
  },
  _hide(){
    this.get('el').fadeOut(150);
  },
  id: Ember.computed(function(){
    return Foundation.GetYoDigits(5, 'tooltip-dynamic');
  }),
  el: Ember.computed(function(){
    return $(`#${this.get('id')}`);
  }),
  textObserver: Ember.observer('text', function(){
    this.get('el').text(this.get('text'));
  }),
  mouseEnter(e){
    this._setPosition(e);
    this._show();
  },
  mouseLeave(){
    this._hide();
  }
});
