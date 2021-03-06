import Ember from 'ember';

export default Ember.Helper.helper(([date])=>{
  var today = moment(new Date());
  var date = moment(date);
  var dd = today.diff(date, 'seconds')
  switch(true){
    case dd < 86400: // < 24 hours
      var i = Math.floor(dd/60/60);
      return  'Today';
      break;
    case dd < 172800: // < 48 hours
      return  'Yesterday';
      break;
    default:
      if(today.year() == date.year()){
        return  date.format("MMMM D");
      }else{
        return  date.format("MMMM D, YYYY");
      }
      break;
  }
});
