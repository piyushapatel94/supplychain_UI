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
    queryParams: ['requestid'],
    requestid:null,
    isShowingModal: false,
    ShowingModalrequest:false,
    Notshow_fileupload:true,
    testlist:['Engine block',"Engine Payload",'Fule Hose','Speedometer','Magnetometer','washer'],
    actions: {
      toggleModal: function() {
        this.toggleProperty('isShowingModal');
      },
      okbutton:function(){
          this.set('isShowingModal',false);
           this.set('ShowingModalrequest',false);
      },
      gotoTracking:function(key1,key){
          var keydashboard =key1;
          console.log('keydashboard',keydashboard)
          var requestid = key;
          console.log("reqid",requestid);
          this.set('keydashboard',keydashboard);
          this.set('requestid',requestid);
          this.transitionToRoute('alldetails', {queryParams: {requestid: requestid}}); 
      },
       cancel:function(){
            this.set("isShowingModalss",false);
            this.set("isShowingModal_s",false);
            this.set("isShowingModal",false);
        },
      submitrequest:function(){
          var usertype =this.get('usertype');
          console.log("usertype--lol",usertype);

           var url = this.get('url');
            console.log('url------>', url);
          var mydate =this.get('mydate');
          var dd = mydate.getDate();
          var mm = mydate.getMonth()+1; //January is 0!
          
          var yyyy = mydate.getFullYear();
          if(dd<10){
              dd='0'+dd;
          } 
          if(mm<10){
              mm='0'+mm;
          } 
          var mydate = dd+'/'+mm+'/'+yyyy;
          console.log("mydate",mydate);
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
          let{
            materialtype,
            Quantity,
            address,
            requestto,
            companyname
          }=this.getProperties('materialtype','Quantity','address','requestto','companyname');
         
          var dataString = {  
            "status":"RequestInitiated",
            "InvolvedParties":usertype,
            "transactionString":{
               "updatedby":usertype,
                "expecteddelivery":mydate,
                "address": address,
                "materialtype":materialtype,
                "Quantity": Quantity,
                "today":today,
                "companyname": companyname,
                "requestto":requestto,
                "url":url,
                "remark":"NA",
                "status":"RequestInitiated",
            }
        };
        console.log(dataString);
        var mycontroller = this;
        
        return $.ajax({
        url:CONFIG.GOURL+'/newRequest',
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(dataString),
        success: function(response) {
        var message = response.message;
        console.log("message" + message);
        if( message === "resquest send successfully !"){
            mycontroller.toggleProperty('ShowingModalrequest');
        }
        },      
            error: function(response) {
        console.log('DEBUG: GET Enquiries Failed');
        console.log("Error Message: ", response.message);
        
    }
        
        });
                  
      }
    }
});