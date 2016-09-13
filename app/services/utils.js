import Ember from 'ember';

export default Ember.Service.extend({
  ajax: Ember.inject.service(),
  regex: Ember.computed(function(){
    return /(?:^|\s)(["'])?(?:(?:(?:(?:https?|ftp|\w):)?\/\/)|(?:www.))(?:\S+(?::\S*)?@)?(?:(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:1\d\d|2[0-4]\d|25[0-4]|[1-9]\d?))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?\1(?:$|\s)/ig;
  }),
  googlePlace(id){
    return DS.PromiseObject.create({
      promise: this.get('ajax').request('v2/places/' + id)
    });
  },
  insertParagraph(text){
    return text ? text.split("\n").join("<br />") : text;
  },
  lineBreaker(text){
    return text ? text.split("\n").join(" \n ") : text;
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
    // var regexToken = /((http[s]?|ftp):\/)?\/?([^:\/\s]+)((\/\w+)*\/)([\w\-\.]+[^#?\s]+)(#[\w\-]+)?/g;
    // var regexToken = /((?:[a-z][\w-]+:(?:\/{1,3}|[a-z0-9%])|www\d{0,3}[.]|[a-z0-9.\-]+[.][a-z]{2,4}\/)(?:[^\s()<>]+|\(([^\s()<>]+|(\([^\s()<>]+\)))*\))+(?:\(([^\s()<>]+|(\([^\s()<>]+\)))*\)|[^\s]))/g;
    var regexToken = this.get('regex');
    // Iterate through any URLs in the text.
    while( (matchArray = regexToken.exec( source )) !== null ){
        var token = matchArray[0];
        urlArray.push( token.trim() );
    }
    return urlArray;
  },
  setFBMetaTags(profile){
    return [{
        type: 'meta',
        tagId: 'meta-og-title',
        attrs: {
          property: 'og:title',
          content: `Connect with ${profile.get('name') || profile.get('fullName')} on Brydge: a brand new Professional Network`
        }
      },{
          type: 'meta',
          tagId: 'meta-og-image',
          attrs: {
            property: 'og:image',
            content: 'https://storage.googleapis.com/brydge-assets/meta-image.jpg'
          }
      },{
          type: 'meta',
          tagId: 'meta-og-url',
          attrs: {
            property: 'og:url',
            content: `https://brydge.com/${profile.get('url') || profile.get('publicProfile') }`
          }
      }]

  },



});
