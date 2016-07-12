import Ember from 'ember';

export default Ember.Service.extend({
  insertParagraph(text){
    return text.split("\n").join("<br />");
  },
	edit(text, e){
    var el = e.currentTarget;
    var offset = (el.offsetHeight - el.clientHeight);
    if(text){
      el.style.height = 'auto';
      el.style.height = (el.scrollHeight+offset) + "px";        
    }else{
      el.style.height = '';        
    }
	},
  
});

