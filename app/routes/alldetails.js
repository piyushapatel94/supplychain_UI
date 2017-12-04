import Route from '@ember/routing/route';
import CONFIG from 'supplychain-1/config/environment';
export default Route.extend({
    model(){
        var requestid = this.controllerFor('userhome').get('requestid');
        console.log("requestid---",requestid);
        this.controllerFor('alldetails').set('requestid', requestid);
      
        var usertype= sessionStorage.getItem('usertype');
        console.log("usertype",usertype);
        this.controllerFor('alldetails').set('usertype', usertype);
        
        if(usertype === "Supplier"){
            this.controllerFor('alldetails').set('isShowSupplier', true);
        }
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
         var status1 =response.message.transactionlist[1].transactiondetails.status;
         var myshow = (response.message.transactionlist).slice(-1);
         var mystatus = myshow[0].transactiondetails.status;
         console.log("mystatus",mystatus);
         mycontroller.controllerFor('alldetails').set('mystatus', mystatus);
         for(var i=0 ;i< transactionlist.length;i++){
            var status = response.message.transactionlist[i].transactiondetails.status;
           
            if(status === "RequestInitiated"){
                mycontroller.controllerFor('alldetails').set('isShowRequestAccept', false);
                mycontroller.controllerFor('alldetails').set('isShowRequestInitaited',true);
                
                
            }else if(status === "RequestAccepted"){
                mycontroller.controllerFor('alldetails').set('isShowRequestAccept', true);
                mycontroller.controllerFor('alldetails').set('isShowRequestInitaited',false);
                
                
            }
            else{
                
            }
        }
        },      
         error: function(response) {
            console.log('DEBUG: GET Enquiries Failed');
            console.log("Error Message: ", response.message);
            
         }
         
         });
    }
});
