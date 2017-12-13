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
          //  mycontroller.controllerFor('alldetails').set("isShowingModal",true);
           
            //return image.save();
            
          }, function () {
            //image.rollback();
            console.log("file upload sucessfully...");
          });
          
        },
      
        },
    model(){
         this.controllerFor('alldetails').set('isShowingModal', false);
         this.controllerFor('alldetails').set('isShowingModals', false);
         this.controllerFor('alldetails').set('isShowingModalss', false);
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
      Ember.$.ajax({
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
        
    } if(response.message.transactionlist.length > 5){
         var transactiondetails5 =response.message.transactionlist[5].transactiondetails;
         console.log("transactiondetails5",JSON.stringify(transactiondetails5));
        mycontroller.controllerFor('alldetails').set('transactiondetails5', transactiondetails5);
        
    }
    if(response.message.transactionlist.length > 6){
         var transactiondetails6 =response.message.transactionlist[6].transactiondetails;
         console.log("transactiondetails6",JSON.stringify(transactiondetails6));
        mycontroller.controllerFor('alldetails').set('transactiondetails6', transactiondetails6);
        
    }
   if(response.message.transactionlist.length > 7){
         var transactiondetails7 =response.message.transactionlist[7].transactiondetails;
         console.log("transactiondetails7",JSON.stringify(transactiondetails7));
        mycontroller.controllerFor('alldetails').set('transactiondetails7', transactiondetails7);
        
    } 
    if(response.message.transactionlist.length > 8){
         var transactiondetails8 =response.message.transactionlist[8].transactiondetails;
         console.log("transactiondetails8",JSON.stringify(transactiondetails8));
        mycontroller.controllerFor('alldetails').set('transactiondetails8', transactiondetails8);
        
    } 
    if(response.message.transactionlist.length > 9){
         var transactiondetails9 =response.message.transactionlist[9].transactiondetails;
          var staus9 =response.message.transactionlist[9].transactiondetails.status;
         /* console.log("staus9",staus9);
          if(staus9 === 'invoiceDecline'){
              var my
          }*/
         console.log("transactiondetails9",JSON.stringify(transactiondetails9));
        mycontroller.controllerFor('alldetails').set('transactiondetails9', transactiondetails9);
        
        } if(response.message.transactionlist.length > 9){
            for(var i=0;i< response.message.transactionlist.length;i++){
               var status =response.message.transactionlist[i].transactiondetails.status;
               //console.log( status,"status---from after 9th index");
               if(status === 'invoiceDecline'){
                var myobj=response.message.transactionlist[i].transactiondetails;
                console.log( myobj,"myobj--+++-from after 9th index");
               mycontroller.controllerFor('alldetails').set('myobj', myobj);
               //break;
            }
            if(status === 'invoiceApproved'){
                var myobj=response.message.transactionlist[i].transactiondetails;
                console.log( myobj,"myobj--+++%%%%-from after 9th index");
               mycontroller.controllerFor('alldetails').set('myobj', myobj);
               break;
               }
            }
        
    } 
    
        var myshow = (response.message.transactionlist).slice(-1);
        console.log("myshow",myshow);
       var mystatus = myshow[0].transactiondetails.status;
        console.log("mystatus",mystatus);
          mycontroller.controllerFor('alldetails').set('mystatus', mystatus);
        var mythisStatus =myshow[0].transactiondetails.thisStatus;
       console.log("mythisStatus----",mythisStatus);
       
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
            if(mystatus === 'DoDelievered'){
                mycontroller.controllerFor('alldetails').set('isShowManquotbutton', false);
                mycontroller.controllerFor('alldetails').set('isShowSupplier', false);
                mycontroller.controllerFor('alldetails').set('isShowSupquotbutton',false);
                mycontroller.controllerFor('alldetails').set('isShowSupDotbutton',false);
                 mycontroller.controllerFor('alldetails').set('isShowSuopINvobutton',true);


            }
            if(mystatus === 'deliveryorderRaised'){
                mycontroller.controllerFor('alldetails').set('isShowManquotbutton', false);
                mycontroller.controllerFor('alldetails').set('isShowSupplier', false);
                mycontroller.controllerFor('alldetails').set('isShowSupquotbutton',false);
                mycontroller.controllerFor('alldetails').set('isShowSupDotbutton',false);
                 mycontroller.controllerFor('alldetails').set('isShowSuopINvobutton',false);


            }  if(mystatus === "shipped"){
                   mycontroller.controllerFor('alldetails').set('isShowManquotbutton', false);
                mycontroller.controllerFor('alldetails').set('isShowSupplier', false);
                mycontroller.controllerFor('alldetails').set('isShowSupquotbutton',false);
                mycontroller.controllerFor('alldetails').set('isShowSupDotbutton',false);
                 mycontroller.controllerFor('alldetails').set('isShowSuopINvobutton',false);
             }
             if(mystatus === "invoiceDecline"){
                   mycontroller.controllerFor('alldetails').set('isShowManquotbutton', false);
                mycontroller.controllerFor('alldetails').set('isShowSupplier', false);
                mycontroller.controllerFor('alldetails').set('isShowSupquotbutton',false);
                mycontroller.controllerFor('alldetails').set('isShowSupDotbutton',false);
                 mycontroller.controllerFor('alldetails').set('isShowSuopINvobutton',false);
                 mycontroller.controllerFor('alldetails').set('isShowSuop_ReINVobutton',true);
             }
             if(mystatus === "invoiceRaised"){
                   mycontroller.controllerFor('alldetails').set('isShowManquotbutton', false);
                mycontroller.controllerFor('alldetails').set('isShowSupplier', false);
                mycontroller.controllerFor('alldetails').set('isShowSupquotbutton',false);
                mycontroller.controllerFor('alldetails').set('isShowSupDotbutton',false);
                 mycontroller.controllerFor('alldetails').set('isShowSuopINvobutton',false);
                 mycontroller.controllerFor('alldetails').set('isShowSuop_ReINVobutton',false);
             }
             if(mystatus === "invoiceApproved"){
                   mycontroller.controllerFor('alldetails').set('isShowManquotbutton', false);
                mycontroller.controllerFor('alldetails').set('isShowSupplier', false);
                mycontroller.controllerFor('alldetails').set('isShowSupquotbutton',false);
                mycontroller.controllerFor('alldetails').set('isShowSupDotbutton',false);
                 mycontroller.controllerFor('alldetails').set('isShowSuopINvobutton',false);
                 mycontroller.controllerFor('alldetails').set('isShowSuop_ReINVobutton',false);
             }
             
         }
         if(usertype === "Manufacturer"){
            if(mystatus === "QuotationRaised"){
           mycontroller.controllerFor('alldetails').set('isShowManquotbutton', true);
            }
            if(mystatus === "quotationAccepted"){
                mycontroller.controllerFor('alldetails').set('isShowManpotbutton', true);
                 mycontroller.controllerFor('alldetails').set('isShowManquotbutton', false);
                }

            if(mystatus === "invoiceRaised"){
                mycontroller.controllerFor('alldetails').set('isShowManpotbutton', false);
                 mycontroller.controllerFor('alldetails').set('isShowManquotbutton', false);
                  mycontroller.controllerFor('alldetails').set('isShowManINVaccpbutton', true);
                }
                if(mystatus === "invoiceApproved"){
                     mycontroller.controllerFor('alldetails').set('isShowManpotbutton', false);
                 mycontroller.controllerFor('alldetails').set('isShowManquotbutton', false);
                  mycontroller.controllerFor('alldetails').set('isShowManINVaccpbutton', false);
                }
            
         }
         if(usertype === "logistics"){
             if(mystatus === "deliveryorderRaised"){
                 mycontroller.controllerFor('alldetails').set('isShowlogshiptbutton', true); 
             }
             
             if(mystatus === "shipped"){
                  mycontroller.controllerFor('alldetails').set('isShowlogshiptbutton', false); 
                 mycontroller.controllerFor('alldetails').set('isShowlogdodtbutton', true); 
             }
         }
         if(usertype === 'banker'){
              if(mystatus === "invoiceApproved"){
                 mycontroller.controllerFor('alldetails').set('isShowBnktpayINTbutton', true); 
             }if(mystatus ==="paymentInitiated"){
                mycontroller.controllerFor('alldetails').set('isShowBnktpayINTbutton', false); 
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
            else if(status === "deliveryorderRaised"){
                mycontroller.controllerFor('alldetails').set('isShowRequestAccept', false);
                mycontroller.controllerFor('alldetails').set('isShowRequestInitaited',false);
                mycontroller.controllerFor('alldetails').set('isShowQuotationRaised',false);
                mycontroller.controllerFor('alldetails').set('isShowQuotationAccept',false);
                mycontroller.controllerFor('alldetails').set('isShowPORaised',false);
                 mycontroller.controllerFor('alldetails').set('isShowDeleveryOrdered',true);
                mycontroller.controllerFor('alldetails').set('dislapymessage','The order is expected to  deliver by 27 Aug 2018.');
                
                
            }else if(status === "shipped"){
                mycontroller.controllerFor('alldetails').set('isShowRequestAccept', false);
                mycontroller.controllerFor('alldetails').set('isShowRequestInitaited',false);
                mycontroller.controllerFor('alldetails').set('isShowQuotationRaised',false);
                mycontroller.controllerFor('alldetails').set('isShowQuotationAccept',false);
                mycontroller.controllerFor('alldetails').set('isShowPORaised',false);
                 mycontroller.controllerFor('alldetails').set('isShowDeleveryOrdered',false);
                 mycontroller.controllerFor('alldetails').set('isShowshipped',true);
                mycontroller.controllerFor('alldetails').set('dislapymessage','The order is expected to  deliver by 27 Aug 2018');
                
                
            }
            else if(status === "DoDelievered"){
                mycontroller.controllerFor('alldetails').set('isShowRequestAccept', false);
                mycontroller.controllerFor('alldetails').set('isShowRequestInitaited',false);
                mycontroller.controllerFor('alldetails').set('isShowQuotationRaised',false);
                mycontroller.controllerFor('alldetails').set('isShowQuotationAccept',false);
                mycontroller.controllerFor('alldetails').set('isShowPORaised',false);
                 mycontroller.controllerFor('alldetails').set('isShowDeleveryOrdered',false);
                 mycontroller.controllerFor('alldetails').set('isShowshipped',false);
                  mycontroller.controllerFor('alldetails').set('isShowDodev',true);
                mycontroller.controllerFor('alldetails').set('dislapymessage','Order Has been delivered successfully at manufacturers location');
                
                
            }else if(status === "invoiceRaised"){
                mycontroller.controllerFor('alldetails').set('isShowRequestAccept', false);
                mycontroller.controllerFor('alldetails').set('isShowRequestInitaited',false);
                mycontroller.controllerFor('alldetails').set('isShowQuotationRaised',false);
                mycontroller.controllerFor('alldetails').set('isShowQuotationAccept',false);
                mycontroller.controllerFor('alldetails').set('isShowPORaised',false);
                 mycontroller.controllerFor('alldetails').set('isShowDeleveryOrdered',false);
                 mycontroller.controllerFor('alldetails').set('isShowshipped',false);
                  mycontroller.controllerFor('alldetails').set('isShowDodev',false);
                  mycontroller.controllerFor('alldetails').set('isShowInvoice',true);
                    mycontroller.controllerFor('alldetails').set('isShowInvoiceDecline',false);
                mycontroller.controllerFor('alldetails').set('dislapymessage','Invoice is raised and awaited for manfucturers approval');
                
                
            
               
            }else if(status === "invoiceDecline"){
                mycontroller.controllerFor('alldetails').set('isShowRequestAccept', false);
                mycontroller.controllerFor('alldetails').set('isShowRequestInitaited',false);
                mycontroller.controllerFor('alldetails').set('isShowQuotationRaised',false);
                mycontroller.controllerFor('alldetails').set('isShowQuotationAccept',false);
                mycontroller.controllerFor('alldetails').set('isShowPORaised',false);
                 mycontroller.controllerFor('alldetails').set('isShowDeleveryOrdered',false);
                 mycontroller.controllerFor('alldetails').set('isShowshipped',false);
                  mycontroller.controllerFor('alldetails').set('isShowDodev',false);
                  mycontroller.controllerFor('alldetails').set('isShowInvoice',false);
                   mycontroller.controllerFor('alldetails').set('isShowInvoiceDecline',true);
                mycontroller.controllerFor('alldetails').set('dislapymessage','Invoice is raised and awaited for manfucturers approval');
                
                
            } else if(status === "invoiceApproved"){
                mycontroller.controllerFor('alldetails').set('isShowRequestAccept', false);
                mycontroller.controllerFor('alldetails').set('isShowRequestInitaited',false);
                mycontroller.controllerFor('alldetails').set('isShowQuotationRaised',false);
                mycontroller.controllerFor('alldetails').set('isShowQuotationAccept',false);
                mycontroller.controllerFor('alldetails').set('isShowPORaised',false);
                 mycontroller.controllerFor('alldetails').set('isShowDeleveryOrdered',false);
                 mycontroller.controllerFor('alldetails').set('isShowshipped',false);
                  mycontroller.controllerFor('alldetails').set('isShowDodev',false);
                  mycontroller.controllerFor('alldetails').set('isShowInvoice',false);
                   mycontroller.controllerFor('alldetails').set('isShowInvoiceDecline',false);
                   mycontroller.controllerFor('alldetails').set('isShowInvoiceapproved',true);
                mycontroller.controllerFor('alldetails').set('dislapymessage','Invoice is raised and awaited for manfucturers approval');
                
                
            }
            else if(status === "paymentInitiated"){
                mycontroller.controllerFor('alldetails').set('isShowRequestAccept', false);
                mycontroller.controllerFor('alldetails').set('isShowRequestInitaited',false);
                mycontroller.controllerFor('alldetails').set('isShowQuotationRaised',false);
                mycontroller.controllerFor('alldetails').set('isShowQuotationAccept',false);
                mycontroller.controllerFor('alldetails').set('isShowPORaised',false);
                 mycontroller.controllerFor('alldetails').set('isShowDeleveryOrdered',false);
                 mycontroller.controllerFor('alldetails').set('isShowshipped',false);
                  mycontroller.controllerFor('alldetails').set('isShowDodev',false);
                  mycontroller.controllerFor('alldetails').set('isShowInvoice',false);
                   mycontroller.controllerFor('alldetails').set('isShowInvoiceDecline',false);
                   mycontroller.controllerFor('alldetails').set('isShowInvoiceapproved',false);
                     mycontroller.controllerFor('alldetails').set('isShowPaymentInit',true);
                mycontroller.controllerFor('alldetails').set('dislapymessage','Invoice is raised and awaited for manfucturers approval');
                
                
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
