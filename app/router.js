import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('userhome');
  this.route('home');
  this.route('dashboard');
  this.route('alldetails');
});

export default Router;
