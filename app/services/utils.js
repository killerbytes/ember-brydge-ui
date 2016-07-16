import Ember from 'ember';

export default Ember.Service.extend({
  insertParagraph(text){
    return text.split("\n").join("<br />");
  },
	textAreaChange(elem, value){
    var el = elem.get(0);
    if(!elem.data('height')) elem.data('height', el.clientHeight)
    var offset = (el.offsetHeight - el.clientHeight);
    if(value && elem.data('height') != el.scrollHeight){
      elem.height('auto');
      elem.height(el.scrollHeight+offset);
    }else{
      elem.height('auto');
    }
	},

});
