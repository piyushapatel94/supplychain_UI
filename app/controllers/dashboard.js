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

    isShowingModal: false,
    testlist:['Engine blocks',"Hex 24fastners",'fuel hose','fuel tank','Breakes','washers'],
    actions: {
      toggleModal: function() {
        this.toggleProperty('isShowingModal');
      },
      submitrequest:function(){
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
            address
          }=this.getProperties('materialtype','Quantity','address');
         
          var dataString = {  
            "status":"MaterialRequested",
            "InvolvedParties":"manufacturer",
            "transactionString":{
               // "updatedBy":usertype,
                "expecteddelivery":mydate,
                "address": address,
                "materialtype":materialtype,
                "Quantity": Quantity,
                "today":today,
               // "url":url,
                "remark":"NA",
                "status":"MaterialRequested",
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
        
        mycontroller.toggleProperty('ShowingModalrequest');
        // mycontroller.transitionToRoute('userhome')
        //mycontroller.transitionToRoute('home');

        },      
            error: function(response) {
        console.log('DEBUG: GET Enquiries Failed');
        console.log("Error Message: ", response.message);
        
    }
        
        });
                  
      }
    }
});