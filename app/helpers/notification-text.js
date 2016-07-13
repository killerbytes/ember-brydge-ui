import Ember from 'ember';

export default Ember.Helper.helper(function([item]){
	function getContent(content){
		return  content.length > 80 ? content.substr(0, 80) + ' ...' : content;		
	}
	var text;
	switch(item.get('type')){
		case 'compliment':
		 	text = "posted a compliment to you";
			break;
		case 'ask':
			text = "asked you a question";
			break;
		case 'share':
			text = "shared your broadcast " + '<strong>' + getContent(item.get('content')) + '</strong>';;
			break;
		case 'answer':
			text = "answered your question";
			break;
		case 'comment':
			text = "commented on your broadcast " +  '<strong>' + getContent(item.get('content')) + '</strong>';
			break;
		case 'vote':
			text = "upvoted your broadcast "  + '<strong>' + getContent(item.get('content')) + '</strong>';;
			break;
		case 'accept':
			text = "accepted your request";
			break;
	}
  return text;
});