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
    actions:{
        gotorequest:function(Key,key2){
            
            var requestid = key2;
            console.log("requestid---",requestid);
         
            var keyUserhome =Key
            console.log("key2--userhome",keyUserhome)
             this.set("keyUserhome",keyUserhome);
            
            this.set("requestid",requestid);
            //this.controllerFor('alldetails').set('requestid',requestid);
            //this.transitionToRoute('alldetails');   
            this.transitionToRoute('alldetails', {queryParams: {requestid: requestid}}); 
        }
    }
});