/*  
	Not used anymore - For deletion 
*/
import Ember from 'ember';

export function checkCount(count) {
	console.warn('DEPRECATED: checkCount - Should use {{#if}} instead');
  return count[0] > 0 ? 'block': 'none'
}

export default Ember.Helper.helper(checkCount);
