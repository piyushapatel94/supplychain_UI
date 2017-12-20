import Route from '@ember/routing/route';
import CONFIG from 'supplychain-1/config/environment';
export default Route.extend({
      actions:{
        uploadDoc:function (file) {
            // var mycontroller = this;
            console.log("entering upload FIR 3");
    var mycontroller = this;
             console.log("lol--",file)
       var myfile =file.file;
       console.log("lol-5555555-",myfile)
          file.upload(CONFIG.GOURL+'/UploadDocs').then(function (response) {
            console.log(JSON.stringify(response));
            var url =response.body.url;
            console.log("url ::",JSON.stringify(url));
         mycontroller.controllerFor('dashboard').set('url',url);
          
            mycontroller.controllerFor('dashboard').set("isShow_fileupload",true);
            
            if(mycontroller.controllerFor('dashboard').set("isShow_fileupload",true)){
                    mycontroller.controllerFor('dashboard').set("Notshow_fileupload",false);
            } 
            console.log("saviing file...");
            console.log("file upload sucessfully. 1..");
            //return image.save();
            
          }, function () {
            //image.rollback();
            console.log("file upload sucessfully...");
          });
          
        },
      
        },
    model(){
           



           this.controllerFor('dashboard').set('Notshow_fileupload', true); 
         if(this.controllerFor('dashboard').set('Notshow_fileupload', true)){
this.controllerFor('dashboard').set(' isShow_fileupload', false); 
         }  
 this.controllerFor('dashboard').set('IsnotShowRetailer', true); 
       var requestid = this.controllerFor('userhome').get('requestid');
       console.log("requestid---",requestid);
       this.controllerFor('dashboard').set('requestid', requestid);

       var usertype= sessionStorage.getItem('usertype');
       console.log("usertype",usertype);
       this.controllerFor('dashboard').set('usertype', usertype);
       if(usertype === 'retailer'){
          this.controllerFor('dashboard').set('IsShowretailer', true);
           this.controllerFor('dashboard').set('IsnotShowRetailer', false); 
       }

       var mycontroller = this;
      
                 Ember.$.ajax({
                       url: CONFIG.GOURL + '/getInventory',
                       type: 'GET',
                       contentType: 'application/json',
                       success: function(data) {
                           // var message = response.message;
                           console.log(JSON.stringify(data));
                           var mydetails = data.message;
                           console.log("mydetails-----", mydetails);
                           
                           mycontroller.controllerFor('dashboard').set('mydetails', mydetails);

                       },
                       error: function(response) {
                           console.log('DEBUG: GET Enquiries Failed');
                           console.log("Error Message: ", data.message);

                       }


                   });
          Ember.$.ajax({
                       url: CONFIG.GOURL + '/readStatus',
                       type: 'GET',
                       contentType: 'application/json',
                       success: function(data) {
                           var statuscount =data.statuscount;
                            console.log(JSON.stringify(statuscount));
                            for (var i = 0; i < statuscount.length; i++) {

                            if (statuscount[i].statusname === "RequestInitiated") {
                                var RequestInitiatedCount = JSON.stringify(statuscount[i].statuscount);
                           
                                console.log(JSON.stringify(statuscount[i].statuscount));
                                mycontroller.controllerFor('dashboard').set('IsRequestInitiatedCount', RequestInitiatedCount * 10);
                             //   mycontroller.controllerFor('dashboard').set('isclaimRaisedCount', isclaimRaisedCount);
                            }
                                
                            if (statuscount[i].statusname === "RequestAccepted") {
                                var RequestAcceptedcount = statuscount[i].statuscount;
                                console.log("RequestAcceptedcount ---", typeof(RequestAcceptedcount));
                               // var MaterialRequestedcount = 10 * IsMaterialRequestedCount;
                                //console.log("MaterialRequestedcount-------->", RequestAcceptedcount);
                                mycontroller.controllerFor('dashboard').set('IsRequestAcceptedcount', RequestAcceptedcount );
                              
                            }
                               
                            if (statuscount[i].statusname === "QuotationRejected") {
                                var isQuotationRejectedCount = statuscount[i].statuscount;
                                //var QuotationRejectedcount = Count * 10;
                                console.log(JSON.stringify(statuscount[i].statuscount));
                                mycontroller.controllerFor('dashboard').set('QuotationRejectedcount', isQuotationRejectedCount * 10);
                                mycontroller.controllerFor('dashboard').set('isQuotationRejectedCount', isQuotationRejectedCount);
                            }
                             if (statuscount[i].statusname === "quotationAccepted") {
                                var isquotationAcceptedCount = statuscount[i].statuscount;
                                //var QuotationRejectedcount = Count * 10;
                                console.log(JSON.stringify(statuscount[i].statuscount));
                                mycontroller.controllerFor('dashboard').set('QuotationRejectedcount', isquotationAcceptedCount);
                                //mycontroller.controllerFor('dashboard').set('isQuotationRejectedCount', isQuotationRejectedCount);
                            }
                               
                            if (statuscount[i].statusname === "paymentInitiated") {
                                var isPaymentInitiatedCount = statuscount[i].statuscount;
                             
                                console.log(JSON.stringify(statuscount[i].statuscount));
                                mycontroller.controllerFor('dashboard').set('PaymentInitiatedcount', isPaymentInitiatedCount * 10);
                                mycontroller.controllerFor('dashboard').set('isPaymentInitiatedCount', isPaymentInitiatedCount);
                            } 
                           

                            if (statuscount[i].statusname === "purchaseorderRaised") {
                                var ISPOCount = statuscount[i].statuscount;
                            //    var POraisedcount = Count * 10;
                                console.log(JSON.stringify(statuscount[i].statuscount));
                                mycontroller.controllerFor('dashboard').set('POraisedcount', ISPOCount * 10);
                               // mycontroller.controllerFor('dashboard').set('ISPOCount', ISPOCount);
                            }
                           
                            if (statuscount[i].statusname === "paymentPaid") {
                                var IspaymentPaidCount = statuscount[i].statuscount;
                             //   var PaymentReceivedcount = Count * 10;
                                console.log(JSON.stringify(statuscount[i].statuscount));
                                mycontroller.controllerFor('dashboard').set('paymentPaidcount', IspaymentPaidCount );
                               // mycontroller.controllerFor('dashboard').set('IsPaymentReceivedCount', IsPaymentReceivedCount);
                            } 
                           
                            if (statuscount[i].statusname === "invoiceRaised") {
                                var isInvoiceRaisedCount = statuscount[i].statuscount;
                             //   var InvoiceRaisedcount = Count * 10;
                                console.log("InvoiceRaisedcount-----",isInvoiceRaisedCount *10);
                                mycontroller.controllerFor('dashboard').set('InvoiceRaisedcount', isInvoiceRaisedCount );
                                mycontroller.controllerFor('dashboard').set('isInvoiceRaisedCount', isInvoiceRaisedCount);
                            } 
                           
                            if (statuscount[i].statusname === "invoiceApproved") {
                                var isInvoiceApprovedCount = statuscount[i].statuscount;
                             //   var InvoiceApprovedcount = Count * 10;
                                console.log(JSON.stringify(statuscount[i].statuscount));
                                mycontroller.controllerFor('dashboard').set('InvoiceApprovedcount', isInvoiceApprovedCount );
                                mycontroller.controllerFor('dashboard').set('isInvoiceApprovedCount', isInvoiceApprovedCount);
                            } 
                           
                            if (statuscount[i].statusname === "DoDelievered") {
                                var isDoDeliveredCount = statuscount[i].statuscount;
                           //     var DoDeliveredcount = Count * 10;
                                console.log(JSON.stringify(statuscount[i].statuscount));
                                mycontroller.controllerFor('dashboard').set('DoDeliveredcount', isDoDeliveredCount );
                                mycontroller.controllerFor('dashboard').set('isDoDeliveredCount', isDoDeliveredCount *10);
                            }
                            
                            if (statuscount[i].statusname === "shipped") {
                                var isShippedCount = statuscount[i].statuscount;
                            //    var NotDeliveredcount = Count * 10
                                console.log(JSON.stringify(statuscount[i].statuscount));
                                mycontroller.controllerFor('dashboard').set('shippedcount', isShippedCount );
                                mycontroller.controllerFor('dashboard').set('isshippedcount', isShippedCount*10);
                            } 
                            
                            if (statuscount[i].statusname === "claimRequested") {
                                var isclaimRequestedCount = statuscount[i].statuscount;
                            
                                console.log(JSON.stringify(statuscount[i].statuscount));
                                mycontroller.controllerFor('dashboard').set('claimRequestedcount', isclaimRequestedCount );
                                mycontroller.controllerFor('dashboard').set('isclaimRequestedCount', isclaimRequestedCount);
                            }
                            
                            if (statuscount[i].statusname === "QuotationRaised") {
                                var IsQuotationRaisedCount = statuscount[i].statuscount;
                                console.log("IsQuotationRaisedCount ---", typeof(IsQuotationRaisedCount));
                                var QuotationRaisedcount = IsQuotationRaisedCount *10 ;
                                console.log("QuotationRaisedcount-------->", QuotationRaisedcount);
                                mycontroller.controllerFor('dashboard').set('QuotationRaisedcount', IsQuotationRaisedCount  );
                               // mycontroller.controllerFor('dashboard').set('IsQuotationRaisedCount', IsQuotationRaisedCount);
                            } 
                            
                            if (statuscount[i].statusname === "deliveryorderRaised") {
                                var isDOraisedCount = statuscount[i].statuscount;
                                var DOraisedcount = isDOraisedCount * 10;
                                console.log( "DOraisedcount --->",isDOraisedCount * 10);
                                mycontroller.controllerFor('dashboard').set('DOraisedcount', isDOraisedCount );
                                mycontroller.controllerFor('dashboard').set('isDOraisedCount', isDOraisedCount * 10);
                                
                            } 
                            }
                            },
                       error: function(response) {
                           console.log('DEBUG: GET Enquiries Failed');
                           console.log("Error Message: ", data.message);

                       }


                   });
                Ember.$.ajax({
                       url: CONFIG.GOURL + '/readIndex',
                       type: 'GET',
                       contentType: 'application/json',
                       success: function(data) {
                           
                                Ember.$.ajax({
                                url: CONFIG.GOURL + '/readAllrequest',
                                type: 'GET',
                                contentType: 'application/json',
                                success: function(data) {
                                
                                            Ember.$.ajax({
                                    url: CONFIG.GOURL + '/readtrackingdata',
                                    type: 'GET',
                                    contentType: 'application/json',
                                    success: function(response) {
                                        console.log("data from tracking",JSON.stringify(response.data))
                                        var mydata =response.data;
                                             mycontroller.controllerFor('dashboard').set('mydata', mydata);
                                             var materialtype ;
                                             var tracking =[];
                                             console.log(mydata.length)
                                             for(var i=0;i<mydata.length;i++){
                                            var myarray =response.data[i];
                                             var updatedby =myarray[i].Record.transactionlist[0].transactiondetails.updatedby;
                                            var materialtype =myarray[i].Record.transactionlist[0].transactiondetails.materialtype;
                                            var requestto =myarray[i].Record.transactionlist[0].transactiondetails.requestto;
                                          
                                            console.log(materialtype);
                                                    if(updatedby === 'Manufacturer'){
                                                        tracking.push({
                                                            "key":myarray[i].Key,
                                                     "materialtype": materialtype,
                                                        "updatedby":updatedby,
                                                        "companyname":requestto,
                                                         });

                                             
                                             }else if(updatedby === 'retailer'){
                                                 tracking.push({
                                                      "key":myarray[i].Key,
                                                     "materialtype": materialtype,
                                                        "updatedby":updatedby,
                                                        "companyname":myarray[i].Record.transactionlist[0].transactiondetails.companyname
                                                         });

                                             }
                                             console.log(tracking,"---tracking details");
                                             mycontroller.controllerFor('dashboard').set('tracking',tracking);
                                    }
                                    },
                                    error: function(response) {
                                        console.log('DEBUG: GET Enquiries Failed');
                                        console.log("Error Message: ", data.message);

                                        }
                                    });      
                            },
                            error: function(response) {
                                console.log('DEBUG: GET Enquiries Failed');
                                console.log("Error Message: ", data.message);

                            }


                        });
                                
                           
                       },
                       error: function(response) {
                           console.log('DEBUG: GET Enquiries Failed');
                           console.log("Error Message: ", data.message);

                       }


                   });
          

    }
});
