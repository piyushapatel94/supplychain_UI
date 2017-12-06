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
            mycontroller.controllerFor('dashboard').set('url',url);
            mycontroller.controllerFor('dashboard').set("isShowingModal",true);
           
            //return image.save();
            
          }, function () {
            //image.rollback();
            console.log("file upload sucessfully...");
          });
          
        },
      
        },
    model(){
        

       var requestid = this.controllerFor('userhome').get('requestid');
       console.log("requestid---",requestid);
       this.controllerFor('dashboard').set('requestid', requestid);

       var usertype= sessionStorage.getItem('usertype');
       console.log("usertype",usertype);
       this.controllerFor('dashboard').set('usertype', usertype);

       var mycontroller = this;
      
                 return $.ajax({
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
          

    }
});
