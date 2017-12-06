import Route from '@ember/routing/route';
import CONFIG from 'supplychain-1/config/environment';
export default Route.extend({
    actions:{
        uploadDoc:function (file) {
            // var mycontroller = this;
            console.log("entering upload FIR 3");
    var mycontroller = this;
             console.log(file)
       
          file.upload(CONFIG.GOURL+'/UploadDocs').then(function (response) {
            console.log(JSON.stringify(response));
            var url =response.body.url;
            console.log("url ::",JSON.stringify(url));
            mycontroller.controllerFor('alldetails').set('url',url);
            mycontroller.controllerFor('alldetails').set("isShowingModal",true);
           
            //return image.save();
            
          }, function () {
            //image.rollback();
            console.log("file upload sucessfully...");
          });
          
        },
      
        },
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

         var transactiondetails0 =response.message.transactionlist[0].transactiondetails;
         console.log("transactiondetails0",JSON.stringify(transactiondetails0));
         mycontroller.controllerFor('alldetails').set('transactiondetails0', transactiondetails0);
         if(response.message.transactionlist.length > 2){
            
        

         //transactiondetails 1 is not required becaz of status is request accepted only
         var transactiondetails2 =response.message.transactionlist[2].transactiondetails;
         console.log("transactiondetails2",JSON.stringify(transactiondetails2));
        mycontroller.controllerFor('alldetails').set('transactiondetails2', transactiondetails2);
        
        }
        if(response.message.transactionlist.length > 4){
            
         //transactiondetails 3 is not required becaz of status is request accepted only
         var transactiondetails4 =response.message.transactionlist[4].transactiondetails;
         console.log("transactiondetails4",JSON.stringify(transactiondetails4));
        mycontroller.controllerFor('alldetails').set('transactiondetails4', transactiondetails4);
        
        }
        var myshow = (response.message.transactionlist).slice(-1);
        console.log("myshow",myshow);
       var mystatus = myshow[0].transactiondetails.status;
        console.log("mystatus",mystatus);
         mycontroller.controllerFor('alldetails').set('mystatus', mystatus);
         if(mystatus === "RequestInitiated" &&  usertype==="Supplier" ){
             mycontroller.controllerFor('alldetails').set('isShowSupquotbutton', true);
            mycontroller.controllerFor('alldetails').set('isShowSupplier', false);
         }
         if( usertype === "Supplier") {
            
             if(mystatus === "RequestInitiated"){
                
                mycontroller.controllerFor('alldetails').set('isShowSupplier', true);
                mycontroller.controllerFor('alldetails').set('isShowSupquotbutton', false);
             }
             if(mystatus === "RequestAccepted")
             {
                 mycontroller.controllerFor('alldetails').set('isShowSupquotbutton', true);
                 mycontroller.controllerFor('alldetails').set('isShowSupplier', false);
            }
            if(mystatus === "QuotationRaised"){
                mycontroller.controllerFor('alldetails').set('isShowManquotbutton', false);
                mycontroller.controllerFor('alldetails').set('isShowSupplier', false);
                mycontroller.controllerFor('alldetails').set('isShowSupquotbutton',false);
            }
            if(mystatus === "quotationAccepted"){
                mycontroller.controllerFor('alldetails').set('isShowManquotbutton', false);
                mycontroller.controllerFor('alldetails').set('isShowSupplier', false);
                mycontroller.controllerFor('alldetails').set('isShowSupquotbutton',false);
             }
            if(mystatus === "purchaseorderRaised"){    
                mycontroller.controllerFor('alldetails').set('isShowManquotbutton', false);
                mycontroller.controllerFor('alldetails').set('isShowSupplier', false);
                mycontroller.controllerFor('alldetails').set('isShowSupquotbutton',false);
                mycontroller.controllerFor('alldetails').set('isShowSupDotbutton',true);

                }     
            
         }
         if(usertype === "Manufacturer"){
            if(mystatus === "QuotationRaised"){
           mycontroller.controllerFor('alldetails').set('isShowManquotbutton', true);
            }
            if(mystatus === "quotationAccepted"){
                mycontroller.controllerFor('alldetails').set('isShowManpotbutton', true);
                }
                if(mystatus === "quotationAccepted"){
                    mycontroller.controllerFor('alldetails').set('isShowManpotbutton', true);
                    }
            
         }
        
         for(var i=0 ;i< transactionlist.length;i++){
            var status = response.message.transactionlist[i].transactiondetails.status;
           
            if(status === "RequestInitiated"){
                mycontroller.controllerFor('alldetails').set('isShowRequestAccept', false);
                mycontroller.controllerFor('alldetails').set('isShowRequestInitaited',true);
                mycontroller.controllerFor('alldetails').set('isShowQuotationRaised',false);
                mycontroller.controllerFor('alldetails').set('dislapymessage','You sent material request.');
                
                
                
            }else if(status === "RequestAccepted"){
                mycontroller.controllerFor('alldetails').set('isShowRequestAccept', true);
                mycontroller.controllerFor('alldetails').set('isShowRequestInitaited',false);
                mycontroller.controllerFor('alldetails').set('dislapymessage','Supplier accepted material request, Awaited for quotation.');
                
                
            }
            else if(status === "QuotationRaised"){
                mycontroller.controllerFor('alldetails').set('isShowRequestAccept', false);
                mycontroller.controllerFor('alldetails').set('isShowRequestInitaited',false);
                mycontroller.controllerFor('alldetails').set('isShowQuotationRaised',true);
                mycontroller.controllerFor('alldetails').set('dislapymessage','Supplier raised quotation, Awaited for your approval.');
                
                
            }
            else if(status === "quotationAccepted"){
                mycontroller.controllerFor('alldetails').set('isShowRequestAccept', false);
                mycontroller.controllerFor('alldetails').set('isShowRequestInitaited',false);
                mycontroller.controllerFor('alldetails').set('isShowQuotationRaised',false);
                mycontroller.controllerFor('alldetails').set('isShowQuotationAccept',true);
                mycontroller.controllerFor('alldetails').set('dislapymessage','You accepted quotation, Raise purchase order.');
                
                
            }
            else if(status === "purchaseorderRaised"){
                mycontroller.controllerFor('alldetails').set('isShowRequestAccept', false);
                mycontroller.controllerFor('alldetails').set('isShowRequestInitaited',false);
                mycontroller.controllerFor('alldetails').set('isShowQuotationRaised',false);
                mycontroller.controllerFor('alldetails').set('isShowQuotationAccept',false);
                mycontroller.controllerFor('alldetails').set('isShowPORaised',true);
                mycontroller.controllerFor('alldetails').set('dislapymessage','You accepted quotation, Raise purchase order.');
                
                
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
