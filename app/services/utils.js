import Ember from 'ember';

export default Ember.Service.extend({
  ajax: Ember.inject.service(),
  googlePlace(id){
    return DS.PromiseObject.create({
      promise: this.get('ajax').request('v2/places/' + id)
    });
  },
  insertParagraph(text){
    return text ? text.split("\n").join("<br />") : text;
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
  findUrls( text ){
    var source = (text || '').toString();
    var urlArray = [];
    var url;
    var matchArray;
    // Regular expression to find FTP, HTTP(S) and email URLs.

    // var regexToken = /(?:https?:\/\/)?(?:[\w]+\.)([a-zA-Z\.]{2,6})([\/\w\.-]*)*\/?/g;
    // var regexToken = /((http[s]?|ftp):\/)?\/?([^:\/\s]+)((\/\w+)*\/)([\w\-\.]+[^#?\s]+)(.*)?(#[\w\-]+)?\s+/g;
    var regexToken = /((http[s]?|ftp):\/)?\/?([^:\/\s]+)((\/\w+)*\/)([\w\-\.]+[^#?\s]+)(#[\w\-]+)?/g;
    // Iterate through any URLs in the text.
    while( (matchArray = regexToken.exec( source )) !== null ){
        var token = matchArray[0];
        urlArray.push( token );
    }
    return urlArray;
  },
  replaceUrls(content){
    var urls = this.findUrls(content);
    _.forEach(urls, i=>{
      content = content.replace(i, '<a href='+i+' target=_blank>'+i+'</a>');
    })
    return content;
  }


});
