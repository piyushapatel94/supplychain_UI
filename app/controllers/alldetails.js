import Ember from 'ember';
import CONFIG from 'supplychain-1/config/environment';
import {
    validator,
    buildValidations
}
from 'ember-cp-validations';
//var myTotalPrice;
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


    actions: {
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
                "InvolvedParties": "retailer",
                "transactionString": {
                    "updatedby": "usertype",
                    "companyname": "companyname",
                    "address": "address",
                    "materialtype": "Speedometer",

                    "Quantity": "00",
                    "today": "today",
                    "url": "url",
                    "totalamount": "NA",
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
                    //mycontroller.toggleProperty('ShowingModalrequest');
                    // mycontroller.transitionToRoute('userhome')
                    // mycontroller.transitionToRoute('home');

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
            /* var url =this.get('url');
             console.log('url------>',url);*/

            let {
                companyname,
                address,
                item,
                Quantity

            } = this.getProperties('companyname', 'address', 'item', 'Quantity', 'pono');

            var dataString = {
                "requestid": requestid,
                "status": "RequestRejected",
                "InvolvedParties": usertype,
                "transactionString": {
                    "updatedBy": usertype,
                    "companyname": companyname,
                    "address": address,
                    "item": item,
                    "Quantity": Quantity,
                    "formdate": formdate1,
                    "url": url,
                    "totalamount": "NA",
                    "status": "DOraised",
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
                    console.log("message" + message);
                    mycontroller.toggleProperty('ShowingModalrequest');
                    // mycontroller.transitionToRoute('userhome')
                    // mycontroller.transitionToRoute('home');

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

                Quantity

            } = this.getProperties('totalprice', 'Quantity');

            var dataString = {

                "status": "QuotationRaised",
                "InvolvedParties": "retailer",
                "transactionString": {
                    "updatedby": usertype,
                    "companyname": "companyname",
                    "address": "address",
                    "materialtype": "Speedometer",

                    "Quantity": Quantity,
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
                    //mycontroller.toggleProperty('ShowingModalrequest');
                    // mycontroller.transitionToRoute('userhome')
                    // mycontroller.transitionToRoute('home');

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

                "status": "quotationAccepted",
                "InvolvedParties": "retailer",
                "transactionString": {
                    "updatedby": usertype,
                    "companyname": "companyname",
                    "address": "address",
                    "materialtype": "Speedometer",

                    "Quantity": "00",
                    "today": today,
                    "url": "url",
                    "totalprice": "totalprice",
                    "status": "quotationAccepted",
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
                      console.log("message" +JSON.stringify (response));
                            
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

            let {
                logistics

            } = this.getProperties('logistics');
            console.log("logistics", logistics);
            var mydataString3 = {
                "status": "shipped",
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
                   
                    "status": "shipped",
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
                      console.log("message" +JSON.stringify (response));
                            
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
                "status": "DoDelievered",
                "InvolvedParties": usertype,
                "transactionString": {
                    "updatedby": usertype,
                    "expectedDelivery":mydate,
                    "materialtype":mymaterialTye ,
                    "units": "NA",
                    "Quantity": myquantity,
                    "today": today,
                    "url": "url",
                    "totalprice": "NA",
                    "status": "DoDelievered",
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
                      console.log("message" +JSON.stringify (response));
                            
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
                    "Quantity": "50",
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
                      console.log("message" +JSON.stringify (response));
                            
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
                      console.log("message" +JSON.stringify (response));
                            
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
                      console.log("message" +JSON.stringify (response));
                            
                  },      
                      error: function(response) {
                     console.log('DEBUG: GET Enquiries Failed');
                     console.log("Error Message: ", response.message);
                     
              }
                  
                  });

        }
    }
});