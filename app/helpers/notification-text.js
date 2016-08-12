import Ember from 'ember';

export default Ember.Helper.helper(function([item]){
	function getContent(content){
		return  content.length > 80 ? content.substr(0, 80) + ' ...' : content;
	}
	var text;
	switch(item.get('type')){
		case 'compliment':
		 	text = "complimented you";
			break;
		case 'ask':
			text = "asked you a question";
			break;
		case 'answer':
			text = "answered your question";
			break;
		case 'share':
			text = "shared " + '<strong>' + getContent(item.get('content')) + '</strong>';;
			break;
		case 'comment':
			text = "commented on " +  '<strong>' + getContent(item.get('content')) + '</strong>';
			break;
		case 'vote':
			text = "upvoted "  + '<strong>' + getContent(item.get('content')) + '</strong>';;
			break;
		case 'accept':
			text = "accepted your connection request";
			break;
	}
  return text;
});
