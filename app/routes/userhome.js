import Route from '@ember/routing/route';

export default Route.extend({
    model(){
        this.controllerFor('userhome').set('showlogin', false);
    }
});
