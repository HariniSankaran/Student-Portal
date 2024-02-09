import { helper } from '@ember/component/helper';

export default helper(function checkUndefined(params/*, hash*/) {

  if(typeof params === 'undefined'){
    return true;
  }
  else{
    return false;
  }
});
