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

    showregistration:false,
    showUser:false,
    shownewrequestbutton:false,
    isShowlogin:true,
      testlist: ['Manufacturer','Supplier','Distributor','Retailer','Banker','Insuerer','Transpoter'],

    actions:{
        //for pop-up modal
        toggleModal: function() {

           // this.toggleProperty('isShowingModal');
         this.set('showlogin',true);
        },
        gotodashboard:function(){
            var usertype = sessionStorage.getItem('usertype');
            console.log("usertype",usertype);
            if(usertype === 'Manufacturer' || usertype === 'retailer'){
            this.transitionToRoute('dashboard') ; 
        }  
    
        },
        gotorequests:function(){
            this.transitionToRoute('userhome') ;   
        },
        login:function(){
            var email = this.get('email');
            console.log(email);
              var password = this.get('password');
            console.log(password);
        if (email === null || email === undefined || email === "" || password === null || password === undefined || password === "") {
                    alert("please fill details for login");
                } else {
                    let {
                email,
                password
            } = this.getProperties('email', 'password');
               console.log(email);
               console.log(password);
               var dataString = {
                "email": email,
                "password": password,
            };
            console.log(JSON.stringify(dataString));
                 var mycontroller = this;
                console.log(email);
                return $.ajax({
                url:CONFIG.GOURL+'/mock/Login',
                type: 'POST',
                contentType: 'application/json',
                data: JSON.stringify(dataString),
                success: function(response) {
                    console.log(JSON.stringify(response));
                    var message = response.message;
                console.log("message" + message);
                          
                        var usertype=response.userType;
                            console.log("usertype :" + usertype);
                            sessionStorage.setItem('usertype', usertype);
                            mycontroller.set("usertype",usertype);
                           
                            mycontroller.set('isShowingModal', false);
                            mycontroller.set('showUser',true);
                           
                             mycontroller.set(' notshowuser',false);
                            mycontroller.set('showlogin', false);
                            mycontroller.transitionToRoute('userhome')    

                },      
                    error: function(response) {
                   console.log('DEBUG: GET Enquiries Failed');
                   console.log("Error Message: ", response.message);
                   
            }
                
                });

           
                }
            

        },
        logout:function(){
            console.log("in logout");
            window.location.reload(true);
        },
        //goto to on registration
        signup:function(){
            this.set("showregistration",true);
            this.set("isShowlogin",false);

        }
    }

});