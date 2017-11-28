import Route from '@ember/routing/route';
import CONFIG from 'supplychain-1/config/environment';
export default Route.extend({
    model(){
        var requestid = this.controllerFor('userhome').get('requestid');
        console.log("requestid---",requestid);
        this.controllerFor('alldetails').set('requestid', requestid);
        var mycontroller = this;
        $.ajax({
         url:CONFIG.GOURL+'/readRequest',
         type: 'GET',
         contentType: 'application/json', 
         headers:{
             'authorization':requestid
         },
         success: function(response) {
             // var message = response.message;
         console.log(JSON.stringify(response));
         var transactionlist =response.message.transactionlist;
         mycontroller.controllerFor('alldetails').set('transactionlist', transactionlist);
         var transactiondetails =response.message.transactionlist[0].transactiondetails;
         console.log("transactiondetails",JSON.stringify(transactiondetails));
         mycontroller.controllerFor('alldetails').set('transactiondetails', transactiondetails);
         },      
         error: function(response) {
            console.log('DEBUG: GET Enquiries Failed');
            console.log("Error Message: ", response.message);
            
         }
         
         });
    }
});
