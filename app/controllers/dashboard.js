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
      submit:function(){
          var mydate =this.get('mydate');
          console.log("mydate",mydate);
      }
    }
});