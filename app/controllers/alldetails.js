import Ember from 'ember';
import CONFIG from 'supplychain-1/config/environment';
import {
    validator,
    buildValidations
}
from 'ember-cp-validations';
var selectedsource ,selectedDestination;
var Validations = buildValidations({
    email: [
        validator('presence', true),
        validator('format', {
            regex: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
            message: 'This field must be a valid email address'
        })
    ],
    password: {
        description: 'Password',
        validators: [
            validator('presence', true),
            validator('format', {
                regex: /^[a-zA-Z0-9]{6,8}$/,
                message: 'This field must be a Valid Password (minimum 6 digits required)'
            })
        ],
    },

});

export default Ember.Controller.extend(Validations, {
  

banklist:['Cash','NEFT','Cheque'],
citylist:['pune','Mumbai','Chennai','Delhi'],
myIcon: {
        url: "assets/images/t1.svg",
        size: new google.maps.Size(40,40),
        scaledSize: new google.maps.Size(30,30),
        anchor: new google.maps.Point(15, 15),
        origin: new google.maps.Point(0, 0),
        labelOrigin: new google.maps.Point(30, 15),
      },
      myIcon2: {
        url: "assets/images/p3.svg",
        size: new google.maps.Size(40,40),
        scaledSize: new google.maps.Size(30,30),
        anchor: new google.maps.Point(15, 15),
        origin: new google.maps.Point(0, 0),
        labelOrigin: new google.maps.Point(30, 15),
      },
    actions: {
        okbutton:function(){
            this.set("my_isShowingModal",false);
             this.transitionToRoute('userhome');
        },
        loadThispage:function(){
           var requestid = this.controllerFor('userhome').get('requestid');
        console.log("requestid---",requestid);
        this.set('requestid', requestid);
      
        var usertype= sessionStorage.getItem('usertype');
        console.log("usertype",usertype);
        this.set('usertype', usertype);
        
        if(usertype === "Supplier"){
            this.set('isShowSupplier', true);
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
            if(mystatus === "QuotationAccepted"){
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
            if(mystatus === 'DeliveryOrderDelievered'){
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
             
         }
         if(usertype === "Manufacturer"){
            if(mystatus === "QuotationRaised"){
           mycontroller.controllerFor('alldetails').set('isShowManquotbutton', true);
            }
            if(mystatus === "QuotationAccepted"){
                mycontroller.controllerFor('alldetails').set('isShowManpotbutton', true);
                 mycontroller.controllerFor('alldetails').set('isShowManquotbutton', false);
                }

            if(mystatus === "invoiceRaised"){
                mycontroller.controllerFor('alldetails').set('isShowManpotbutton', false);
                 mycontroller.controllerFor('alldetails').set('isShowManquotbutton', false);
                  mycontroller.controllerFor('alldetails').set('isShowManINVaccpbutton', true);
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
            else if(status === "QuotationAccepted"){
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
            else if(status === "DeliveryOrderDelievered"){
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
            
            else{
                
            }
        }
        },      
         error: function(response) {
            console.log('DEBUG: GET Enquiries Failed');
            console.log("Error Message: ", response.message);
            
         }
         
        });
         
        },

        gotoback:function(){
          this.transitionToRoute('userhome');    
        },
        acceptrequest: function() {
            var requestid = this.get('requestid')
           
            var usertype = this.get('usertype');
            console.log('usertype', usertype);
            /* var url =this.get('url');
             console.log('url------>',url);*/
            var today = new Date();
            var dd = today.getDate();
            var mm = today.getMonth() + 1; //January is 0!

            var yyyy = today.getFullYear();
            if (dd < 10) {
                dd = '0' + dd;
            }
            if (mm < 10) {
                mm = '0' + mm;
            }
            var today = dd + '/' + mm + '/' + yyyy;
            console.log("today--", today);
            var dataString = {

                "status": "RequestAccepted",
                "InvolvedParties": usertype,
                "transactionString": {
                    "updatedby":usertype,
                    "companyname": "companyname",
                    "address": "address",
                    "Quantity": "00",
                    "today": "today",
                    "status": "RequestAccepted",
                    "remark": "NA"
                }
            }
            console.log(JSON.stringify(dataString));
            var mycontroller = this;

            return $.ajax({
                url: CONFIG.GOURL + '/updateRequest',
                type: 'POST',
                headers: {
                    'authorization': requestid,

                },
                contentType: 'application/json',
                data: JSON.stringify(dataString),
                success: function(response) {
                    var message = response.message;
                    
                    console.log("message" + JSON.stringify(response));
                    if( message === "REQUEST UPDATED")  {
                        mycontroller.toggleProperty('my_isShowingModal');
                        mycontroller.set("isShowingModalss",false);
                        mycontroller.set("isShowingModal_s",false);
                         mycontroller.set("isShowingModal",false);
                    }                 
                   
                },
                error: function(response) {
                    console.log('DEBUG: GET Enquiries Failed');
                    console.log("Error Message: ", response.message);

                }

            });
        },
        declinerequest: function() {
            var requestid = this.get('requestid')
            var usertype = this.get('usertype');
            console.log('usertype', usertype);
            var today = new Date();
            var dd = today.getDate();
            var mm = today.getMonth() + 1; //January is 0!

            var yyyy = today.getFullYear();
            if (dd < 10) {
                dd = '0' + dd;
            }
            if (mm < 10) {
                mm = '0' + mm;
            }
            var today = dd + '/' + mm + '/' + yyyy;
            console.log("today--", today);

            
            var dataString = {
                "requestid": requestid,
                "status": "RequestRejected",
                "InvolvedParties": usertype,
                "transactionString": {
                    "updatedBy": usertype,
                    
                    "today":today,
                    "remark": "NA",
                    "status": "RequestRejected",
                }
            };
            console.log(JSON.stringify(dataString));
            var mycontroller = this;

            return $.ajax({
                url: CONFIG.GOURL + '/updateRequest',
                type: 'POST',
                contentType: 'application/json',
                headers: {
                    'authorization': requestid
                },
                data: JSON.stringify(dataString),
                success: function(response) {
                    var message = response.message;
                    
                    console.log("message" + JSON.stringify(response));
                    if( message === "REQUEST UPDATED")  {
                        mycontroller.toggleProperty('my_isShowingModal');
                        mycontroller.set("isShowingModalss",false);
                        mycontroller.set("isShowingModal_s",false);
                         mycontroller.set("isShowingModal",false);
                    }   

                },
                error: function(response) {
                    console.log('DEBUG: GET Enquiries Failed');
                    console.log("Error Message: ", response.message);

                }

            });
        },
        quotationraised: function() {
            var requestid = this.get('requestid')
          
            var usertype = this.get('usertype');
            console.log('usertype', usertype);
            var url = this.get('url');
            console.log('url------>', url);
            var today = new Date();
            var dd = today.getDate();
            var mm = today.getMonth() + 1; //January is 0!

            var yyyy = today.getFullYear();
            if (dd < 10) {
                dd = '0' + dd;
            }
            if (mm < 10) {
                mm = '0' + mm;
            }
            var today = dd + '/' + mm + '/' + yyyy;
            console.log("today--", today);
            let {
                totalprice,

                unit

            } = this.getProperties('totalprice', 'unit');

            var dataString = {

                "status": "QuotationRaised",
                "InvolvedParties": usertype,
                "transactionString": {
                    "updatedby": usertype,
                    "companyname": "companyname",
                    "address": "address",
                    "unit": unit,
                    "today": today,
                    "url": url,
                    "totalprice": totalprice,
                    "status": "QuotationRaised",
                    "remark": "NA"
                }
            }
            console.log(JSON.stringify(dataString));
            var mycontroller = this;

             $.ajax({
                url: CONFIG.GOURL + '/updateRequest',
                type: 'POST',
                headers: {
                    'authorization': requestid,

                },
                contentType: 'application/json',
                data: JSON.stringify(dataString),
                success: function(response) {
                    var message = response.message;
                    
                    console.log("message" + JSON.stringify(response));
                    if( message === "REQUEST UPDATED")  {
                        mycontroller.toggleProperty('my_isShowingModal');
                        mycontroller.set("isShowingModalss",false);
                        mycontroller.set("isShowingModal_s",false);
                         mycontroller.set("isShowingModal",false);
                    }   

                },
                error: function(response) {
                    console.log('DEBUG: GET Enquiries Failed');
                    console.log("Error Message: ", response.message);

                }

            });
        },
        toggleModal: function() {
            this.toggleProperty('isShowingModal');
        },
        my_modal: function() {
            console.log("mymodal function")
            this.toggleProperty('isShowingModal_s');
        },
        toggleModalss: function() {
            console.log("toggleModalss----");
            this.toggleProperty('isShowingModalss');
        },
    
        cancel:function(){
            this.set("isShowingModalss",false);
            this.set("isShowingModal_s",false);
            this.set("isShowingModal",false);
            this.set("isShowingModalsss",false);
        },

        acceptquotation: function() {
            var requestid = this.get('requestid')
            var requestid1 = JSON.stringify(requestid)
            var usertype = this.get('usertype');
            console.log('usertype', usertype);
            /* var url =this.get('url');
             console.log('url------>',url);*/
            var today = new Date();
            var dd = today.getDate();
            var mm = today.getMonth() + 1; //January is 0!

            var yyyy = today.getFullYear();
            if (dd < 10) {
                dd = '0' + dd;
            }
            if (mm < 10) {
                mm = '0' + mm;
            }
            var today = dd + '/' + mm + '/' + yyyy;
            console.log("today--", today);

            var dataString = {

                "status": "QuotationAccepted",
                "InvolvedParties": usertype,
                "transactionString": {
                    "updatedby": usertype,
                    "companyname": "companyname",
                    "today": today,
                    "status": "QuotationAccepted",
                   
                }
            }
            console.log(JSON.stringify(dataString));
            var mycontroller = this;

            return $.ajax({
                url: CONFIG.GOURL + '/updateRequest',
                type: 'POST',
                headers: {
                    'authorization': requestid,

                },
                contentType: 'application/json',
                data: JSON.stringify(dataString),
                success: function(response) {

                        var message = response.message;
                    console.log("message" + JSON.stringify(response));

                    if( message === "REQUEST UPDATED")  {
                        mycontroller.toggleProperty('my_isShowingModal');
                        mycontroller.set("isShowingModalss",false);
                        mycontroller.set("isShowingModal_s",false);
                         mycontroller.set("isShowingModal",false);
                    }   

                },
                error: function(response) {
                    console.log('DEBUG: GET Enquiries Failed');
                    console.log("Error Message: ", response.message);
                }
            });
        },
        declinequotation:function(){
            var requestid = this.get('requestid')
            var requestid1 = JSON.stringify(requestid)
            var usertype = this.get('usertype');
            console.log('usertype', usertype);
           
            var today = new Date();
            var dd = today.getDate();
            var mm = today.getMonth() + 1; //January is 0!

            var yyyy = today.getFullYear();
            if (dd < 10) {
                dd = '0' + dd;
            }
            if (mm < 10) {
                mm = '0' + mm;
            }
            var today = dd + '/' + mm + '/' + yyyy;
            console.log("today--", today);

            var dataString = {

                "status": "quotationRejected",
                "InvolvedParties": usertype,
                "transactionString": {
                    "updatedby": usertype,
                    "today": today,
                     "status": "quotationRejected",
                    "remark": "NA"
                }
            }
            console.log(JSON.stringify(dataString));
            var mycontroller = this;

            return $.ajax({
                url: CONFIG.GOURL + '/updateRequest',
                type: 'POST',
                headers: {
                    'authorization': requestid,

                },
                contentType: 'application/json',
                data: JSON.stringify(dataString),
                success: function(response) {

                        var message = response.message;
                    console.log("message" + JSON.stringify(response));

                    if( message === "REQUEST UPDATED")  {
                        mycontroller.toggleProperty('my_isShowingModal');
                        mycontroller.set("isShowingModalss",false);
                        mycontroller.set("isShowingModal_s",false);
                         mycontroller.set("isShowingModal",false);
                    }   

                },
                error: function(response) {
                    console.log('DEBUG: GET Enquiries Failed');
                    console.log("Error Message: ", response.message);
                }
            });


        },
        poraised: function() {
            var requestid = this.get('requestid')
            var usertype = this.get('usertype');
            console.log('usertype', usertype);
            var url = this.get('url');
            console.log('url------>', url);
            var today = new Date();
            var dd = today.getDate();
            var mm = today.getMonth() + 1; //January is 0!

            var yyyy = today.getFullYear();
            if (dd < 10) {
                dd = '0' + dd;
            }
            if (mm < 10) {
                mm = '0' + mm;
            }
            var today = dd + '/' + mm + '/' + yyyy;
            console.log("today--", today);
            let {
                remark,
                Quantity,
                units

            } = this.getProperties('remark', 'Quantity', 'units');


            var dataString1 = {
                "status": "purchaseorderRaised",
                "InvolvedParties": usertype,
                "transactionString": {
                    "updatedby": usertype,
                    "companyname": "companyname",
                    "address": "address",
                    "materialtype": "NA",
                    "units": units,
                    "Quantity": Quantity,
                    "today": today,
                    "url": url,
                    "totalprice": "NA",
                    "status": "purchaseorderRaised",
                    "remark": remark
                }
            }
            console.log(JSON.stringify(dataString1));
            var mycontroller = this;

            return $.ajax({
                url: CONFIG.GOURL + '/updateRequest',
                type: 'POST',
                headers: {
                    'authorization': requestid,

                },
                contentType: 'application/json',
                data: JSON.stringify(dataString1),
                success: function(response) {
                   var message = response.message;
                    console.log("message" + JSON.stringify(response));

                    if( message === "REQUEST UPDATED")  {
                        mycontroller.toggleProperty('my_isShowingModal');
                        mycontroller.set("isShowingModalss",false);
                        mycontroller.set("isShowingModal_s",false);
                         mycontroller.set("isShowingModal",false);
                    }   

                },
                error: function(response) {
                    console.log('DEBUG: GET Enquiries Failed');
                    console.log("Error Message: ", response.message);

                }

            });

        },
        Doraised: function() {
            console.log("********in do raised----------");
            var requestid = this.get('requestid')
            var usertype = this.get('usertype');
            console.log('usertype', usertype);
            var url = this.get('url');
            console.log('url------>', url);
            var today = new Date();
            var dd = today.getDate();
            var mm = today.getMonth() + 1; //January is 0!

            var yyyy = today.getFullYear();
            if (dd < 10) {
                dd = '0' + dd;
            }
            if (mm < 10) {
                mm = '0' + mm;
            }
            var today = dd + '/' + mm + '/' + yyyy;
            console.log("today--", today);
            var mydate1 = this.get('mydate');
            var dd = mydate1.getDate();
            var mm = mydate1.getMonth() + 1; //January is 0!

            var yyyy = mydate1.getFullYear();
            if (dd < 10) {
                dd = '0' + dd;
            }
            if (mm < 10) {
                mm = '0' + mm;
            }
            var mydate = dd + '/' + mm + '/' + yyyy;
            console.log("today--", mydate);

            let {
                logistics

            } = this.getProperties('logistics');
            console.log("logistics", logistics);
            var mydataString2 = {
                "status": "deliveryorderRaised",
                "InvolvedParties": usertype,
                "transactionString": {
                    "updatedby": usertype,
                    "companyname": "companyname",
                    "address": "address",
                    "materialtype": "NA",
                    "expectedDelivery":mydate,
                    "Quantity": "NA",
                    "today": today,
                    "url": url,
                    "totalprice": "NA",
                    "logistics": logistics,
                    "status": "deliveryorderRaised",
                    "remark": "NA"
                }
            }
            console.log(JSON.stringify(mydataString2));
             var mycontroller = this;

                   $.ajax({
                  url:CONFIG.GOURL+'/updateRequest',
                  type: 'POST',
                  headers: {
                  'authorization' : requestid  ,
                
                   },
                  contentType: 'application/json',
                  data: JSON.stringify(mydataString2),
                  success: function(response) {
                     var message = response.message;
                    console.log("message" + JSON.stringify(response));

                    if( message === "REQUEST UPDATED")  {
                        mycontroller.toggleProperty('my_isShowingModal');
                        mycontroller.set("isShowingModalss",false);
                        mycontroller.set("isShowingModal_s",false);
                         mycontroller.set("isShowingModal",false);
                    }   

                            
                  },      
                      error: function(response) {
                     console.log('DEBUG: GET Enquiries Failed');
                     console.log("Error Message: ", response.message);
                     
              }
                  
                  });

        },toggleModalsss:function(){
            this.toggleProperty('isShowingModalsss');
        },
        toggleModalssss:function(){
            console.log("in modal func")
 this.toggleProperty('isShowingModalssss');
 this.set("isShowingModalssss",true)
        },
        toggleModalssss1:function(){
           // console.log("in modal func")
 this.toggleProperty('isShowingModalssss1');
// this.set("isShowingModalssss",true)
        },
        toggleModalssss2:function(){
           // console.log("in modal func")
 this.toggleProperty('isShowingModalssss2');
// this.set("isShowingModalssss",true)
        },
        toggleModalssss3:function(){
           // console.log("in modal func")
 this.toggleProperty('isShowingModalssss3');
// this.set("isShowingModalssss",true)
        },
        
        gotoshippment:function(){
            console.log("********go to shippment----------");
            var requestid = this.get('requestid')
            var usertype = this.get('usertype');
            console.log('usertype', usertype);
            var url = this.get('url');
            console.log('url------>', url);
            var today = new Date();
            var dd = today.getDate();
            var mm = today.getMonth() + 1; //January is 0!

            var yyyy = today.getFullYear();
            if (dd < 10) {
                dd = '0' + dd;
            }
            if (mm < 10) {
                mm = '0' + mm;
            }
            var today = dd + '/' + mm + '/' + yyyy;
            console.log("today--", today);
            var mydate1 = this.get('mydate');
            var dd = mydate1.getDate();
            var mm = mydate1.getMonth() + 1; //January is 0!

            var yyyy = mydate1.getFullYear();
            if (dd < 10) {
                dd = '0' + dd;
            }
            if (mm < 10) {
                mm = '0' + mm;
            }
            var mydate = dd + '/' + mm + '/' + yyyy;
            console.log("today--", mydate);

           
selectedsource =this.get('selectedsource');
selectedDestination =this.get('selectedDestination');
            console.log("startAdd",selectedsource,selectedDestination);
            this.set("selectedDestination",selectedDestination);
             this.set("selectedsource",selectedsource);
            var mydataString3 = {
                "status": "Shipped",
                "InvolvedParties": usertype,
                "transactionString": {
                    "updatedby": usertype,
                 "expectedDelivery":mydate,
                    "materialtype": "NA",
                    "units": "NA",
                    "Quantity": "NA",
                    "today": today,
                    "url": "url",
                    "totalprice": "NA",
                   "selectedsource":selectedsource,
                   "selectedDestination":selectedDestination,
                    "status": "Shipped",
                    "remark": "NA"
                }
            }
            console.log(JSON.stringify(mydataString3));
             var mycontroller = this;

                   $.ajax({
                  url:CONFIG.GOURL+'/updateRequest',
                  type: 'POST',
                  headers: {
                  'authorization' : requestid  ,
                
                   },
                  contentType: 'application/json',
                  data: JSON.stringify(mydataString3),
                  success: function(response) {
                      var message = response.message;
                    console.log("message" + JSON.stringify(response));

                    if( message === "REQUEST UPDATED")  {
                        mycontroller.toggleProperty('my_isShowingModal');
                        mycontroller.set("isShowingModalss",false);
                        mycontroller.set("isShowingModal_s",false);
                         mycontroller.set("isShowingModal",false);
                         mycontroller.set("isShowingModalsss",false);
                          mycontroller.set("isShowingModalssss",false);
                    } 
                            
                  },      
                      error: function(response) {
                     console.log('DEBUG: GET Enquiries Failed');
                     console.log("Error Message: ", response.message);
                     
              }
                  
                  });

        },
        dodelivered:function(){
            console.log("********go to do-deleveded----------");
            var mymaterialTye =this.get('transactiondetails0.materialtype')
              console.log('mymaterialTye---', mymaterialTye);
              var myquantity =this.get('transactiondetails0.Quantity')
              console.log('myquantity---', myquantity);
            var requestid = this.get('requestid')
            var usertype = this.get('usertype');
            console.log('usertype', usertype);
            var url = this.get('url');
            console.log('url------>', url);
            var today = new Date();
            var dd = today.getDate();
            var mm = today.getMonth() + 1; //January is 0!

            var yyyy = today.getFullYear();
            if (dd < 10) {
                dd = '0' + dd;
            }
            if (mm < 10) {
                mm = '0' + mm;
            }
            var today = dd + '/' + mm + '/' + yyyy;
            console.log("today--", today);
            var mydate1 = this.get('mydate');
            var dd = mydate1.getDate();
            var mm = mydate1.getMonth() + 1; //January is 0!

            var yyyy = mydate1.getFullYear();
            if (dd < 10) {
                dd = '0' + dd;
            }
            if (mm < 10) {
                mm = '0' + mm;
            }
            var mydate = dd + '/' + mm + '/' + yyyy;
            console.log("today--", mydate);
            var mydataString3 = {
                "status": "DeliveryOrderDelievered",
                "InvolvedParties": usertype,
                "transactionString": {
                    "updatedby": usertype,
                    "expectedDelivery":mydate,
                    "materialtype":mymaterialTye ,
                    "units": "NA",
                    "Quantity": myquantity,
                    "today": today,
                    "status": "DeliveryOrderDelievered",
                    
                }
            }
            console.log(JSON.stringify(mydataString3));
             var mycontroller = this;

                   $.ajax({
                  url:CONFIG.GOURL+'/updateRequest',
                  type: 'POST',
                  headers: {
                  'authorization' : requestid  ,
                
                   },
                  contentType: 'application/json',
                  data: JSON.stringify(mydataString3),
                  success: function(response) {
                     var message = response.message;
                    console.log("message" + JSON.stringify(response));

                    if( message === "REQUEST UPDATED")  {
                        mycontroller.toggleProperty('my_isShowingModal');
                        mycontroller.set("isShowingModalss",false);
                        mycontroller.set("isShowingModal_s",false);
                         mycontroller.set("isShowingModal",false);
                          mycontroller.set("isShowingModalsss",false);
                                   mycontroller.set("isShowingModalssss",false);
                           //mycontroller.set("isShowingModalsss",false);isShowingModalsss
                    } 
                  },      
                      error: function(response) {
                     console.log('DEBUG: GET Enquiries Failed');
                     console.log("Error Message: ", response.message);
                     
              }
                  
                  });

        },
        invoiceraise:function(){
            console.log("********go to invoiceraise----------");
            var requestid = this.get('requestid')
            var usertype = this.get('usertype');
            console.log('usertype', usertype);
            var url = this.get('url');
            console.log('url------>', url);
            var today = new Date();
            var dd = today.getDate();
            var mm = today.getMonth() + 1; //January is 0!

            var yyyy = today.getFullYear();
            if (dd < 10) {
                dd = '0' + dd;
            }
            if (mm < 10) {
                mm = '0' + mm;
            }
            var today = dd + '/' + mm + '/' + yyyy;
            console.log("today--", today);
            let {
                devcharge,materialPrice

            } = this.getProperties('devcharge','materialPrice');
            console.log("devcharge", devcharge);
          var  myTotalPrice1 =parseInt (devcharge) + parseInt(devcharge);
          var myTotalPrice =myTotalPrice1.toString();
            console.log("myTotalPrice", myTotalPrice);
            this.set("myTotalPrice",myTotalPrice)
            var mydataString3 = {
                "status": "invoiceRaised",
                "InvolvedParties": usertype,
                "transactionString": {
                    "updatedby": usertype,
                   "myTotalPrice":myTotalPrice,
                    "devcharge":devcharge,
                 
                    "today": today,
                    "url": url,
                   "materialPrice":materialPrice,
                    "status": "invoiceRaised"
                   
                }
            }
            console.log(JSON.stringify(mydataString3));
             var mycontroller = this;

                   $.ajax({
                  url:CONFIG.GOURL+'/updateRequest',
                  type: 'POST',
                  headers: {
                  'authorization' : requestid  ,
                
                   },
                  contentType: 'application/json',
                  data: JSON.stringify(mydataString3),
                  success: function(response) {
                       var message = response.message;
                    console.log("message" + JSON.stringify(response));

                    if( message === "REQUEST UPDATED")  {
                        mycontroller.toggleProperty('my_isShowingModal');
                        mycontroller.set("isShowingModal_s",false);
                         mycontroller.set("isShowingModal",false);
                       
                           mycontroller.set("toggleModalsss",false);
                    } 
                            
                  },      
                      error: function(response) {
                     console.log('DEBUG: GET Enquiries Failed');
                     console.log("Error Message: ", response.message);
                     
              }
                  
                  });


        },
        declineInvoice:function(){
            console.log("********decline invoice---------");
            var requestid = this.get('requestid')
            var usertype = this.get('usertype');
            console.log('usertype', usertype);
            var url = this.get('url');
            console.log('url------>', url);
            var today = new Date();
            var dd = today.getDate();
            var mm = today.getMonth() + 1; //January is 0!

            var yyyy = today.getFullYear();
            if (dd < 10) {
                dd = '0' + dd;
            }
            if (mm < 10) {
                mm = '0' + mm;
            }
            var today = dd + '/' + mm + '/' + yyyy;
            console.log("today--", today);
            
            var mydataString3 = {
                "status": "invoiceDecline",
                "InvolvedParties": usertype,
                "transactionString": {
                    "updatedby": usertype,
                  
                    "today": today,
                   
                    "status": "invoiceDecline"
                   
                }
            }
            console.log(JSON.stringify(mydataString3));
             var mycontroller = this;

                   $.ajax({
                  url:CONFIG.GOURL+'/updateRequest',
                  type: 'POST',
                  headers: {
                  'authorization' : requestid  ,
                
                   },
                  contentType: 'application/json',
                  data: JSON.stringify(mydataString3),
                  success: function(response) {
                       var message = response.message;
                    console.log("message" + JSON.stringify(response));

                    if( message === "REQUEST UPDATED")  {
                        mycontroller.toggleProperty('my_isShowingModal');
                        mycontroller.set("isShowingModalss",false);
                        mycontroller.set("isShowingModal_s",false);
                         mycontroller.set("isShowingModal",false);
                          mycontroller.set("isShowingModalsss",false);
                           mycontroller.set("isShowingModalssss",false);
                    } 
                            
                  },      
                      error: function(response) {
                     console.log('DEBUG: GET Enquiries Failed');
                     console.log("Error Message: ", response.message);
                     
              }
                  
                  });


        },
        Re_invoiceraise:function(){
            console.log("********RE--invoiceraise----------");
            var requestid = this.get('requestid')
            var usertype = this.get('usertype');
            console.log('usertype', usertype);
            var url = this.get('url');
            console.log('url------>', url);
            var today = new Date();
            var dd = today.getDate();
            var mm = today.getMonth() + 1; //January is 0!

            var yyyy = today.getFullYear();
            if (dd < 10) {
                dd = '0' + dd;
            }
            if (mm < 10) {
                mm = '0' + mm;
            }
            var today = dd + '/' + mm + '/' + yyyy;
            console.log("today--", today);
            let {
                devcharge,materialPrice

            } = this.getProperties('devcharge','materialPrice');
            console.log("devcharge", devcharge);
          var  myTotalPrice1 =parseInt (devcharge) + parseInt(devcharge);
          var myTotalPrice =myTotalPrice1.toString();
            console.log("myTotalPrice", myTotalPrice);
            this.set("myTotalPrice",myTotalPrice)
            var mydataString3 = {
                "status": "invoiceRaised",
                "InvolvedParties": usertype,
                "transactionString": {
                    "updatedby": usertype,
                   "myTotalPrice":myTotalPrice,
                    "devcharge":devcharge,
                    "Quantity": "50",
                    "today": today,
                    "url": url,
                    "thisStatus":"ReinvoiceRaised",
                   "materialPrice":materialPrice,
                    "status": "invoiceRaised"
                   
                }
            }
            console.log(JSON.stringify(mydataString3));
             var mycontroller = this;

                   $.ajax({
                  url:CONFIG.GOURL+'/updateRequest',
                  type: 'POST',
                  headers: {
                  'authorization' : requestid  ,
                
                   },
                  contentType: 'application/json',
                  data: JSON.stringify(mydataString3),
                  success: function(response) {
                       var message = response.message;
                    console.log("message" + JSON.stringify(response));

                    if( message === "REQUEST UPDATED")  {
                        mycontroller.toggleProperty('my_isShowingModal');
                        this.set("isShowingModalss",false);
                        this.set("isShowingModal_s",false);
                         this.set("isShowingModal",false);
                          this.set("isShowingModalsss",false);
                           this.set("isShowingModalssss",false);
                    } 
                  },      
                      error: function(response) {
                     console.log('DEBUG: GET Enquiries Failed');
                     console.log("Error Message: ", response.message);
                     
              }
                  
                  });

        },
       acceptInvoice :function(){
             console.log("********decline invoice---------");
            var requestid = this.get('requestid')
            var usertype = this.get('usertype');
            console.log('usertype', usertype);
            var url = this.get('url');
            console.log('url------>', url);
            var today = new Date();
            var dd = today.getDate();
            var mm = today.getMonth() + 1; //January is 0!

            var yyyy = today.getFullYear();
            if (dd < 10) {
                dd = '0' + dd;
            }
            if (mm < 10) {
                mm = '0' + mm;
            }
            var today = dd + '/' + mm + '/' + yyyy;
            console.log("today--", today);
            
            var mydataString3 = {
                "status": "invoiceApproved",
                "InvolvedParties": usertype,
                "transactionString": {
                    "updatedby": usertype,
                    "today": today,
                  "status": "invoiceApproved"
                   
                }
            }
            console.log(JSON.stringify(mydataString3));
             var mycontroller = this;

                   $.ajax({
                  url:CONFIG.GOURL+'/updateRequest',
                  type: 'POST',
                  headers: {
                  'authorization' : requestid  ,
                
                   },
                  contentType: 'application/json',
                  data: JSON.stringify(mydataString3),
                  success: function(response) {
                      var message = response.message;
                    console.log("message" + JSON.stringify(response));

                    if( message === "REQUEST UPDATED")  {
                        mycontroller.toggleProperty('my_isShowingModal');
                        
                           mycontroller.set("isShowingModalssss",false);
                    } 
                            
                  },      
                      error: function(response) {
                     console.log('DEBUG: GET Enquiries Failed');
                     console.log("Error Message: ", response.message);
                     
              }
                  
                  });



        },
        paymentinitiate:function(){
            console.log("********decline invoice---------");
            var requestid = this.get('requestid')
            var usertype = this.get('usertype');
            console.log('usertype', usertype);
            var url = this.get('url');
            console.log('url------>', url);
            var today = new Date();
            var dd = today.getDate();
            var mm = today.getMonth() + 1; //January is 0!

            var yyyy = today.getFullYear();
            if (dd < 10) {
                dd = '0' + dd;
            }
            if (mm < 10) {
                mm = '0' + mm;
            }
            var today = dd + '/' + mm + '/' + yyyy;
            console.log("today--", today);
            let{
                bnkname,paymentmethod
            }=this.getProperties('bnkname','paymentmethod');
            
            var mydataString3 = {
                "status": "paymentInitiated",
                "InvolvedParties": usertype,
                "transactionString": {
                    "updatedby": usertype,
                    "paymentmethod":paymentmethod,
                    "bnkname":bnkname,
                    "today": today,
                   
                    "status": "paymentInitiated"
                   
                }
            }
            console.log(JSON.stringify(mydataString3));
             var mycontroller = this;

                   $.ajax({
                  url:CONFIG.GOURL+'/updateRequest',
                  type: 'POST',
                  headers: {
                  'authorization' : requestid  ,
                
                   },
                  contentType: 'application/json',
                  data: JSON.stringify(mydataString3),
                  success: function(response) {
                      var message = response.message;
                    console.log("message" + JSON.stringify(response));

                    if( message === "REQUEST UPDATED")  {
                        mycontroller.toggleProperty('my_isShowingModal');
                        this.set("isShowingModalss",false);
                        this.set("isShowingModal_s",false);
                         this.set("isShowingModal",false);
                          this.set("isShowingModalsss",false);
                           this.set("isShowingModalssss",false);
                    } 
                            
                  },      
                      error: function(response) {
                     console.log('DEBUG: GET Enquiries Failed');
                     console.log("Error Message: ", response.message);
                     
              }
                  
                  });


        },
        paymentpaid:function()
        {
            console.log("********decline invoice---------");
            var requestid = this.get('requestid')
            var usertype = this.get('usertype');
            console.log('usertype', usertype);
            var url = this.get('url');
            console.log('url------>', url);
            var today = new Date();
            var dd = today.getDate();
            var mm = today.getMonth() + 1; //January is 0!

            var yyyy = today.getFullYear();
            if (dd < 10) {
                dd = '0' + dd;
            }
            if (mm < 10) {
                mm = '0' + mm;
            }
            var today = dd + '/' + mm + '/' + yyyy;
            console.log("today--", today);
             var mydataString3 = {
                "status": "paymentReceived",
                "InvolvedParties": usertype,
                "transactionString": {
                    "updatedby": usertype, 
                    "today": today,
                         "status": "paymentReceived"   
                }
            }
            console.log(JSON.stringify(mydataString3));
             var mycontroller = this;

                   $.ajax({
                  url:CONFIG.GOURL+'/updateRequest',
                  type: 'POST',
                  headers: {
                  'authorization' : requestid  ,
                   },
                  contentType: 'application/json',
                  data: JSON.stringify(mydataString3),
                  success: function(response) {
                       var message = response.message;
                    console.log("message" + JSON.stringify(response));

                    if( message === "REQUEST UPDATED")  {
                        mycontroller.toggleProperty('my_isShowingModal');
                        
                          mycontroller.set("isShowingModalssss",false);
                    } 
                            
                  },      
                      error: function(response) {
                     console.log('DEBUG: GET Enquiries Failed');
                     console.log("Error Message: ", response.message);
                     
              }   
                  });

        },
        showrequestdetails:function(objstring){
            console.log(objstring)
            if (objstring === 'newrequest'){
                this.set('showmaterialrequest',true);
                this.toggleProperty('isshowingmodel_details');
            }
           else if (objstring === 'deliverorder'){
               this.set('showDorequest',true);
                this.set('showmaterialrequest',false);
                this.toggleProperty('isshowingmodel_details');
            }
            else if (objstring === 'purchaseorder'){
               this.set('showPOrequest',true);
                this.set('showmaterialrequest',false);
                this.set('showDorequest',false);
                this.toggleProperty('isshowingmodel_details');
            }
            else if (objstring === 'quotation'){
               this.set('showQuotationrequest',true);
                this.set('showmaterialrequest',false);
                this.set('showDorequest',false);
                 this.set('showPOrequest',false);
                this.toggleProperty('isshowingmodel_details');
            }
             else if (objstring === 'invoice'){
               this.set('showInvorequest',true);   
               this.set('showQuotationrequest',false);
                this.set('showmaterialrequest',false);
                this.set('showDorequest',false);
                 this.set('showPOrequest',false);
                this.toggleProperty('isshowingmodel_details');
            }
        },
        closedetails:function(){
            this.set('isshowingmodel_details',false);
        }
    }
});