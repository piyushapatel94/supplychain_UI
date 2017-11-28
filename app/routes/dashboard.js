import Route from '@ember/routing/route';
import CONFIG from 'supplychain-1/config/environment';
export default Route.extend({
    model(){
        testlist:['Engine blocks',"Hex 24fastners",'fuel hose','fuel tank','Breakes','washers']

       var requestid = this.controllerFor('userhome').get('requestid');
       console.log("requestid---",requestid);
       this.controllerFor('dashboard').set('requestid', requestid);

       

    }
});
