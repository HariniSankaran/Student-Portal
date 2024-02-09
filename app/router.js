import EmberRouter from '@ember/routing/router';
import config from 'student-portal/config/environment';

export default class Router extends EmberRouter {
  location = config.locationType;
  rootURL = config.rootURL;
}

Router.map(function () {
  this.route('student');
  this.route('student-detail' , { path: '/student/update/:student-id'});
  this.route('add-student');
});
