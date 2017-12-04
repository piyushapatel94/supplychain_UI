import Route from '@ember/routing/route';
import CONFIG from 'supplychain-1/config/environment';
export default Route.extend({
    model(){
        

       var requestid = this.controllerFor('userhome').get('requestid');
       console.log("requestid---",requestid);
       this.controllerFor('dashboard').set('requestid', requestid);

       var usertype= sessionStorage.getItem('usertype');
       console.log("usertype",usertype);
       this.controllerFor('dashboard').set('usertype', usertype);
    }
});
