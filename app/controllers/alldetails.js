import Ember from 'ember';
import CONFIG from 'supplychain-1/config/environment';
import {
    validator,
    buildValidations
}
from 'ember-cp-validations';

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

export default Ember.Controller.extend(Validations,{


actions:{
    acceptrequest :function(){
        var requestid =this.get('requestid')
        var requestid1 = JSON.stringify(requestid)
        var usertype =this.get('usertype');
        console.log('usertype',usertype);
       /* var url =this.get('url');
        console.log('url------>',url);*/
        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth()+1; //January is 0!
        
        var yyyy = today.getFullYear();
        if(dd<10){
            dd='0'+dd;
        } 
        if(mm<10){
            mm='0'+mm;
        } 
        var today = dd+'/'+mm+'/'+yyyy;
        console.log("today--",today);
      
        

         var dataString = {
            
            "status": "RequestAccepted",
              "InvolvedParties":"retailer",
            "transactionString": {"updatedby":"usertype",
                                "companyname": "companyname",
                                "address":"address",
                                "materialtype": "Speedometer",
                             
                                "Quantity": "00",    
                                "today":"today",
                                "url":"url",
                                "totalamount":"NA",
                                "status":"RequestAccepted",
                                "remark":"NA"}
            }
            console.log(JSON.stringify(dataString));
            var mycontroller = this;

                return $.ajax({
                url:CONFIG.GOURL+'/updateRequest',
                type: 'POST',
                headers: {
                'authorization' : requestid  ,
              
                 },
                
                 contentType: 'application/json',
                data: JSON.stringify(dataString),
                
                success: function(response) {
                    var message = response.message;
                    console.log("message" +JSON.stringify (response));
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
    declinerequest:function(){
        var requestid =this.get('requestid')
        var usertype =this.get('usertype');
        console.log('usertype',usertype);
       /* var url =this.get('url');
        console.log('url------>',url);*/
      
        let{companyname,
            address,
            item,
            Quantity
            
        }=this.getProperties('companyname','address','item','Quantity','pono');

         var dataString = {  
             "requestid":requestid,
                "status":"RequestRejected",
                "InvolvedParties":usertype,
                "transactionString":{
                    "updatedBy":usertype,
                    "companyname": companyname,
                    "address": address,
                    "item": item,
                    "Quantity": Quantity,    
                    "formdate":formdate1,
                    "url":url,
                    "totalamount":"NA",
                    "status":"DOraised",
                    "remark":"NA",
                    "status":"RequestRejected",
                }
            };
            console.log(JSON.stringify(dataString));
            var mycontroller = this;

                return $.ajax({
                url:CONFIG.GOURL+'/updateRequest',
                type: 'POST',
                contentType: 'application/json',
                headers:{
                    'authorization':requestid
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
    }

}
});