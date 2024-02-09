'use strict';



;define("student-portal/adapters/-json-api", ["exports", "@ember-data/adapter/json-api"], function (_exports, _jsonApi) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _jsonApi.default;
    }
  });
});
;define("student-portal/app", ["exports", "ember-resolver", "ember-load-initializers", "student-portal/config/environment"], function (_exports, _emberResolver, _emberLoadInitializers, _environment) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
  function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : String(i); }
  function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
  class App extends Ember.Application {
    constructor(...args) {
      super(...args);
      _defineProperty(this, "modulePrefix", _environment.default.modulePrefix);
      _defineProperty(this, "podModulePrefix", _environment.default.podModulePrefix);
      _defineProperty(this, "Resolver", _emberResolver.default);
    }
  }
  _exports.default = App;
  (0, _emberLoadInitializers.default)(App, _environment.default.modulePrefix);
});
;define("student-portal/components/sidebar", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _default = _exports.default = Ember.Component.extend({});
});
;define("student-portal/components/student-form", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _default = _exports.default = Ember.Component.extend({});
});
;define("student-portal/components/welcome-page", ["exports", "ember-welcome-page/components/welcome-page"], function (_exports, _welcomePage) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _welcomePage.default;
    }
  });
});
;define("student-portal/controllers/add-student", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _default = _exports.default = Ember.Controller.extend({
    actions: {
      async postStudent() {
        let requestBody = {
          students: {
            image: document.getElementById('image').value,
            year: document.getElementById('year').value,
            name: document.getElementById('name').value,
            domain: document.getElementById('domain').value
          }
        };
        window.alert("Do you wish to add the student detail");
        let response = await fetch('/api/addStudent', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(requestBody)
        });
        this.transitionToRoute("student");
        return await response.json();
      }
    }
  });
});
;define("student-portal/controllers/student-detail", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _default = _exports.default = Ember.Controller.extend({
    actions: {
      async updateStudent() {
        let requestBody = {
          students: {
            image: document.getElementById('image').value,
            year: document.getElementById('year').value,
            name: document.getElementById('name').value,
            domain: document.getElementById('domain').value
          }
        };
        window.alert("Do you wish to update the student detail");
        let response = await fetch(`/api/updatestudent/${this.model.data.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(requestBody)
        });
        this.transitionToRoute("student");
        return await response.json();
      }
    }
  });
});
;define("student-portal/controllers/student", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _default = _exports.default = Ember.Controller.extend({
    isSidebarOpen: false,
    selectedStudent: null,
    actions: {
      openSidebar(student) {
        this.set('isSidebarOpen', true);
        this.set('selectedStudent', student);
        console.log("adasd", this.selectedStudent);
      },
      closeSidebar() {
        this.set('isSidebarOpen', false);
      },
      async deleteStudent() {
        window.alert("Are you sure to delete the student detail");
        const response = await fetch(`/api/deletestudent/${this.selectedStudent.id}`, {
          method: 'DELETE'
        });
        this.set('isSidebarOpen', false);
        this.transitionToRoute('student');
        window.location.reload();
        return response;
      }
    }
  });
});
;define("student-portal/helpers/app-version", ["exports", "student-portal/config/environment", "ember-cli-app-version/utils/regexp"], function (_exports, _environment, _regexp) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.appVersion = appVersion;
  _exports.default = void 0;
  function appVersion(_, hash = {}) {
    const version = _environment.default.APP.version;
    // e.g. 1.0.0-alpha.1+4jds75hf

    // Allow use of 'hideSha' and 'hideVersion' For backwards compatibility
    let versionOnly = hash.versionOnly || hash.hideSha;
    let shaOnly = hash.shaOnly || hash.hideVersion;
    let match = null;
    if (versionOnly) {
      if (hash.showExtended) {
        match = version.match(_regexp.versionExtendedRegExp); // 1.0.0-alpha.1
      }
      // Fallback to just version
      if (!match) {
        match = version.match(_regexp.versionRegExp); // 1.0.0
      }
    }
    if (shaOnly) {
      match = version.match(_regexp.shaRegExp); // 4jds75hf
    }
    return match ? match[0] : version;
  }
  var _default = _exports.default = Ember.Helper.helper(appVersion);
});
;define("student-portal/helpers/check-undefined", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _default = _exports.default = Ember.Helper.helper(function checkUndefined(params /*, hash*/) {
    if (typeof params === 'undefined') {
      return true;
    } else {
      return false;
    }
  });
});
;define("student-portal/helpers/pluralize", ["exports", "ember-inflector/lib/helpers/pluralize"], function (_exports, _pluralize) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _default = _exports.default = _pluralize.default;
});
;define("student-portal/helpers/singularize", ["exports", "ember-inflector/lib/helpers/singularize"], function (_exports, _singularize) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _default = _exports.default = _singularize.default;
});
;define("student-portal/initializers/app-version", ["exports", "ember-cli-app-version/initializer-factory", "student-portal/config/environment"], function (_exports, _initializerFactory, _environment) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  let name, version;
  if (_environment.default.APP) {
    name = _environment.default.APP.name;
    version = _environment.default.APP.version;
  }
  var _default = _exports.default = {
    name: 'App Version',
    initialize: (0, _initializerFactory.default)(name, version)
  };
});
;define("student-portal/initializers/container-debug-adapter", ["exports", "ember-resolver/resolvers/classic/container-debug-adapter"], function (_exports, _containerDebugAdapter) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _default = _exports.default = {
    name: 'container-debug-adapter',
    initialize() {
      let app = arguments[1] || arguments[0];
      app.register('container-debug-adapter:main', _containerDebugAdapter.default);
      app.inject('container-debug-adapter:main', 'namespace', 'application:main');
    }
  };
});
;define("student-portal/initializers/ember-cli-mirage", ["exports", "student-portal/config/environment", "ember-cli-mirage/get-rfc232-test-context", "ember-cli-mirage/start-mirage", "student-portal/mirage/config"], function (_exports, _environment, _getRfc232TestContext, _startMirage, config) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  _exports.startMirage = startMirage;
  const {
    default: baseConfig,
    testConfig,
    makeServer
  } = config;

  //
  // This initializer does two things:
  //
  // 1. Pulls the mirage config objects from the application's config and
  //    registers them in the container so `ember-cli-mirage/start-mirage` can
  //    find them (since it doesn't have access to the app's namespace).
  // 2. Provides legacy support for auto-starting mirage in pre-rfc268 acceptance
  //    tests.
  //
  var _default = _exports.default = {
    name: 'ember-cli-mirage',
    initialize(application) {
      if (baseConfig) {
        application.register('mirage:base-config', baseConfig, {
          instantiate: false
        });
      }
      if (testConfig) {
        application.register('mirage:test-config', testConfig, {
          instantiate: false
        });
      }
      if (makeServer) {
        application.register('mirage:make-server', makeServer, {
          instantiate: false
        });
      }
      _environment.default['ember-cli-mirage'] = _environment.default['ember-cli-mirage'] || {};
      if (_shouldUseMirage(_environment.default.environment, _environment.default['ember-cli-mirage'])) {
        startMirage(_environment.default);
      }
    }
  };
  function startMirage(env = _environment.default) {
    return (0, _startMirage.default)(null, {
      env,
      baseConfig,
      testConfig,
      makeServer
    });
  }
  function _shouldUseMirage(env, addonConfig) {
    if (typeof FastBoot !== 'undefined') {
      return false;
    }
    if ((0, _getRfc232TestContext.default)()) {
      return false;
    }
    let userDeclaredEnabled = typeof addonConfig.enabled !== 'undefined';
    let defaultEnabled = _defaultEnabled(env, addonConfig);
    return userDeclaredEnabled ? addonConfig.enabled : defaultEnabled;
  }

  /*
    Returns a boolean specifying the default behavior for whether
    to initialize Mirage.
  */
  function _defaultEnabled(env, addonConfig) {
    let usingInDev = env === 'development' && !addonConfig.usingProxy;
    let usingInTest = env === 'test';
    return usingInDev || usingInTest;
  }
});
;define("student-portal/initializers/ember-data", ["exports", "ember-data/setup-container", "ember-data"], function (_exports, _setupContainer, _emberData) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  /*
    This code initializes EmberData in an Ember application.
  
    It ensures that the `store` service is automatically injected
    as the `store` property on all routes and controllers.
  */
  var _default = _exports.default = {
    name: 'ember-data',
    initialize: _setupContainer.default
  };
});
;define("student-portal/initializers/export-application-global", ["exports", "student-portal/config/environment"], function (_exports, _environment) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  _exports.initialize = initialize;
  function initialize() {
    var application = arguments[1] || arguments[0];
    if (_environment.default.exportApplicationGlobal !== false) {
      var theGlobal;
      if (typeof window !== 'undefined') {
        theGlobal = window;
      } else if (typeof global !== 'undefined') {
        theGlobal = global;
      } else if (typeof self !== 'undefined') {
        theGlobal = self;
      } else {
        // no reasonable global, just bail
        return;
      }
      var value = _environment.default.exportApplicationGlobal;
      var globalName;
      if (typeof value === 'string') {
        globalName = value;
      } else {
        globalName = Ember.String.classify(_environment.default.modulePrefix);
      }
      if (!theGlobal[globalName]) {
        theGlobal[globalName] = application;
        application.reopen({
          willDestroy: function () {
            this._super.apply(this, arguments);
            delete theGlobal[globalName];
          }
        });
      }
    }
  }
  var _default = _exports.default = {
    name: 'export-application-global',
    initialize: initialize
  };
});
;define("student-portal/instance-initializers/ember-cli-mirage-autostart", ["exports", "ember-cli-mirage/instance-initializers/ember-cli-mirage-autostart"], function (_exports, _emberCliMirageAutostart) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _emberCliMirageAutostart.default;
    }
  });
});
;define("student-portal/instance-initializers/ember-data", ["exports", "ember-data/initialize-store-service"], function (_exports, _initializeStoreService) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _default = _exports.default = {
    name: 'ember-data',
    initialize: _initializeStoreService.default
  };
});
;define("student-portal/mirage/config", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = _default;
  function _default() {
    this.namespace = '/api';
    this.get('/student', (schema, request) => {
      return schema.students.all();
    });
    this.get('/student/:id', (schema, request) => {
      let id = request.params.id;
      return schema.students.find(id);
    });
    this.post('/addStudent', (schema, request) => {
      let attrs = JSON.parse(request.requestBody).students;
      return schema.students.create(attrs);
    });
    this.put('/updatestudent/:id', function (schema, request) {
      let id = request.params.id;
      let attrs = JSON.parse(request.requestBody).students;
      return schema.students.find(id).update(attrs);
    });
    this.del('/deletestudent/:id', (schema, request) => {
      let id = request.params.id;
      return schema.students.find(id).destroy();
    });

    // These comments are here to help you get started. Feel free to delete them.

    /*
      Config (with defaults).
       Note: these only affect routes defined *after* them!
    */

    // this.urlPrefix = '';    // make this `http://localhost:8080`, for example, if your API is on a different server
    // this.namespace = '';    // make this `/api`, for example, if your API is namespaced
    // this.timing = 400;      // delay for each request, automatically set to 0 during testing

    /*
      Shorthand cheatsheet:
       this.get('/posts');
      this.post('/posts');
      this.get('/posts/:id');
      this.put('/posts/:id'); // or this.patch
      this.del('/posts/:id');
       https://www.ember-cli-mirage.com/docs/route-handlers/shorthands
    */
  }
});
;define("student-portal/mirage/factories/student", ["exports", "miragejs"], function (_exports, _miragejs) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _default = _exports.default = _miragejs.Factory.extend({
    domain() {
      const domains = ["Civil", "Mech", "ECE", "EEE", "CSE", "IT", "MBA", "BT", "AIML", "MCA"];
      const randomNumber = Math.random();
      const scaledNumber = Math.floor(randomNumber * 9) + 1;
      if (scaledNumber >= 0 && scaledNumber < domains.length) {
        return domains[scaledNumber];
      } else {
        return null;
      }
    },
    name() {
      const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
      let randomString = '';
      for (let i = 0; i < 6; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        randomString += characters.charAt(randomIndex);
      }
      return randomString;
    },
    year() {
      let min = 2006;
      let max = 2023;
      return Math.floor(Math.random() * (max - min + 1)) + min;
    },
    image() {
      const images = ["https://fastly.picsum.photos/id/85/1280/774.jpg?hmac=h_HHpvfhMmLP6uOSrHS7HSlXVRuMKfBbc8HFKd1Acv4", "https://fastly.picsum.photos/id/35/2758/3622.jpg?hmac=xIB3RTEGJ59FEnaQOXoaDgwX_K6PHAg57R0b4t7tiX0", "https://fastly.picsum.photos/id/7/4728/3168.jpg?hmac=c5B5tfYFM9blHHMhuu4UKmhnbZoJqrzNOP9xjkV4w3o", "https://fastly.picsum.photos/id/34/3872/2592.jpg?hmac=4o5QGDd7eVRX8_ISsc5ZzGrHsFYDoanmcsz7kyu8A9A", "https://fastly.picsum.photos/id/92/3568/2368.jpg?hmac=k-61p7oMQe6U59dEgm0Gu6bWTJGPfHblWxMskxTBZMo", "https://fastly.picsum.photos/id/4/5000/3333.jpg?hmac=ghf06FdmgiD0-G4c9DdNM8RnBIN7BO0-ZGEw47khHP4"];
      return images[Math.floor(Math.random() * 6)];
    }
  });
});
;define("student-portal/mirage/models/student", ["exports", "miragejs"], function (_exports, _miragejs) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _default = _exports.default = _miragejs.Model.extend({});
});
;define("student-portal/mirage/scenarios/default", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = _default;
  function _default(server) {
    server.createList('student', 10);
  }
});
;define("student-portal/mirage/serializers/application", ["exports", "miragejs"], function (_exports, _miragejs) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _default = _exports.default = _miragejs.JSONAPISerializer.extend({});
});
;define("student-portal/router", ["exports", "student-portal/config/environment"], function (_exports, _environment) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
  function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : String(i); }
  function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
  class Router extends Ember.Router {
    constructor(...args) {
      super(...args);
      _defineProperty(this, "location", _environment.default.locationType);
      _defineProperty(this, "rootURL", _environment.default.rootURL);
    }
  }
  _exports.default = Router;
  Router.map(function () {
    this.route('student');
    this.route('student-detail', {
      path: '/student/update/:student-id'
    });
    this.route('add-student');
  });
});
;define("student-portal/routes/add-student", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _default = _exports.default = Ember.Route.extend({});
});
;define("student-portal/routes/student-detail", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _default = _exports.default = Ember.Route.extend({
    async model(params) {
      return await fetch(`/api/student/${params['student-id']}`).then(response => response.json());
    }
  });
});
;define("student-portal/routes/student", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _default = _exports.default = Ember.Route.extend({
    async model() {
      return await fetch('/api/student').then(response => response.json());
    }
  });
});
;define("student-portal/serializers/-default", ["exports", "@ember-data/serializer/json"], function (_exports, _json) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _json.default;
    }
  });
});
;define("student-portal/serializers/-json-api", ["exports", "@ember-data/serializer/json-api"], function (_exports, _jsonApi) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _jsonApi.default;
    }
  });
});
;define("student-portal/serializers/-rest", ["exports", "@ember-data/serializer/rest"], function (_exports, _rest) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _rest.default;
    }
  });
});
;define("student-portal/templates/add-student", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _default = _exports.default = Ember.HTMLBars.template({
    "id": "aJmslr8D",
    "block": "{\"symbols\":[],\"statements\":[[5,\"student-form\",[],[[],[]]],[0,\"\\n\"],[7,\"div\",true],[10,\"class\",\"d-flex justify-content-center\"],[8],[0,\"\\n  \"],[7,\"button\",true],[11,\"onclick\",[28,\"action\",[[23,0,[]],\"postStudent\"],null]],[10,\"class\",\"my-5 btn btn-success\"],[10,\"type\",\"submit\"],[8],[0,\"Add Student\"],[9],[0,\"\\n\"],[9],[0,\"\\n\"]],\"hasEval\":false}",
    "meta": {
      "moduleName": "student-portal/templates/add-student.hbs"
    }
  });
});
;define("student-portal/templates/application", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _default = _exports.default = Ember.HTMLBars.template({
    "id": "+TdUP42d",
    "block": "{\"symbols\":[],\"statements\":[[7,\"div\",true],[10,\"class\",\"header-bg container-fluid  d-flex justify-content-between align-items-start\"],[8],[0,\"\\n  \"],[7,\"img\",true],[10,\"src\",\"https://upload.wikimedia.org/wikipedia/commons/3/30/\"],[10,\"class\",\"mx-3 my-1\"],[10,\"alt\",\"logo\"],[8],[9],[0,\"\\n  \"],[5,\"link-to\",[],[[\"@route\"],[\"add-student\"]],{\"statements\":[[0,\"\\n  \"],[7,\"button\",true],[10,\"class\",\"mt-3 mr-3 btn btn-outline-success\"],[8],[0,\"\\n    Add new Student\\n  \"],[9],[0,\"\\n\"]],\"parameters\":[]}],[0,\"\\n\"],[9],[0,\"\\n\\n\"],[1,[22,\"outlet\"],false]],\"hasEval\":false}",
    "meta": {
      "moduleName": "student-portal/templates/application.hbs"
    }
  });
});
;define("student-portal/templates/components/sidebar", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _default = _exports.default = Ember.HTMLBars.template({
    "id": "Ft3GMGO+",
    "block": "{\"symbols\":[\"&default\"],\"statements\":[[14,1],[0,\"\\n\"],[7,\"div\",true],[10,\"class\",\"sidebar-content m-5\"],[8],[0,\"\\n  \"],[7,\"img\",true],[11,\"src\",[23,0,[\"selectedStudent\",\"attributes\",\"image\"]]],[10,\"alt\",\"student-image\"],[8],[9],[0,\"\\n  \"],[7,\"h5\",true],[10,\"class\",\"pt-5 text-center\"],[8],[0,\"Name: \"],[1,[23,0,[\"selectedStudent\",\"attributes\",\"name\"]],false],[9],[0,\"\\n  \"],[7,\"h5\",true],[10,\"class\",\"text-center\"],[8],[0,\"Department: \"],[1,[23,0,[\"selectedStudent\",\"attributes\",\"domain\"]],false],[9],[0,\"\\n  \"],[7,\"h5\",true],[10,\"class\",\"text-center\"],[8],[0,\"Year: \"],[1,[23,0,[\"selectedStudent\",\"attributes\",\"year\"]],false],[9],[0,\"\\n\\n\"],[9]],\"hasEval\":false}",
    "meta": {
      "moduleName": "student-portal/templates/components/sidebar.hbs"
    }
  });
});
;define("student-portal/templates/components/student-form", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _default = _exports.default = Ember.HTMLBars.template({
    "id": "QguH5bLn",
    "block": "{\"symbols\":[],\"statements\":[[7,\"form\",true],[10,\"class\",\"d-flex flex-column mt-5 pt-5 mx-auto col-6\"],[8],[0,\"\\n    \\n    \"],[7,\"div\",true],[10,\"class\",\"d-flex flex-row justify-content-around\"],[8],[0,\"\\n        \"],[7,\"label\",true],[10,\"for\",\"name\"],[10,\"class\",\"mt-5 mb-3  \"],[8],[0,\"Name:\"],[9],[0,\"\\n        \"],[7,\"input\",true],[10,\"name\",\"name\"],[10,\"id\",\"name\"],[10,\"class\",\"mt-5\"],[10,\"placeholder\",\"Name\"],[10,\"type\",\"text\"],[8],[9],[0,\" \\n    \"],[9],[0,\"\\n    \\n    \"],[7,\"div\",true],[10,\"class\",\"d-flex flex-row justify-content-around\"],[8],[0,\"\\n        \"],[7,\"label\",true],[10,\"for\",\"domain\"],[10,\"class\",\"my-3\"],[8],[0,\"Domain:\"],[9],[0,\"\\n        \"],[7,\"input\",true],[10,\"name\",\"domain\"],[10,\"id\",\"domain\"],[10,\"placeholder\",\"Department\"],[10,\"type\",\"text\"],[8],[9],[0,\"\\n    \"],[9],[0,\"\\n\\n    \"],[7,\"div\",true],[10,\"class\",\"d-flex flex-row justify-content-around \"],[8],[0,\"\\n        \"],[7,\"label\",true],[10,\"for\",\"year\"],[10,\"class\",\"my-3\"],[8],[0,\"Year:\"],[9],[0,\"\\n        \"],[7,\"input\",true],[10,\"name\",\"year\"],[10,\"id\",\"year\"],[10,\"placeholder\",\"Year\"],[10,\"type\",\"number\"],[8],[9],[0,\"\\n    \"],[9],[0,\"\\n\\n    \"],[7,\"div\",true],[10,\"class\",\"d-flex flex-row justify-content-around\"],[8],[0,\"\\n      \"],[7,\"label\",true],[10,\"for\",\"image\"],[10,\"class\",\"my-3\"],[8],[0,\"Image: \"],[9],[0,\"\\n      \"],[7,\"select\",true],[10,\"name\",\"image url\"],[10,\"id\",\"image\"],[10,\"class\",\"dropdown my-auto\"],[10,\"aria-placeholder\",\"Image Url\"],[8],[0,\"\\n        \"],[7,\"option\",true],[10,\"value\",\"\"],[10,\"selected\",\"\"],[8],[0,\"Select any\"],[9],[0,\"\\n        \"],[7,\"option\",true],[10,\"value\",\"https://fastly.picsum.photos/id/146/5000/3333.jpg?hmac=xdlFnzoavokA3U-bzo35Vk4jTBKx8C9fqH5IuCPXj2U\"],[8],[0,\"https://fastly.picsum.photos/id/146/5000/3333.jpg\"],[9],[0,\"\\n        \"],[7,\"option\",true],[10,\"value\",\"https://fastly.picsum.photos/id/153/4763/3155.jpg?hmac=GvglcvSHy1CSmpkqqF-7VSPsc67CmYQZ1CY-do9rh_A\"],[8],[0,\"https://fastly.picsum.photos/id/153/4763/3155.jpg\"],[9],[0,\"\\n        \"],[7,\"option\",true],[10,\"value\",\"https://fastly.picsum.photos/id/155/3264/2176.jpg?hmac=Zgf_oGMJeg18XoKBFmJgp2DgHMRYuorXlDx5wLII9nU\"],[8],[0,\"https://fastly.picsum.photos/id/155/3264/2176.jpg\"],[9],[0,\"\\n        \"],[7,\"option\",true],[10,\"value\",\"https://fastly.picsum.photos/id/127/4032/2272.jpg?hmac=QFoFT2_eb_DCqjdlj09UFgUHwI_zefDTBdECRz9lO5Q\"],[8],[0,\"https://fastly.picsum.photos/id/127/4032/2272.jpg\"],[9],[0,\"\\n      \"],[9],[0,\"\\n    \"],[9],[0,\"\\n\\n\"],[9],[0,\"    \"]],\"hasEval\":false}",
    "meta": {
      "moduleName": "student-portal/templates/components/student-form.hbs"
    }
  });
});
;define("student-portal/templates/student-detail", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _default = _exports.default = Ember.HTMLBars.template({
    "id": "FoZX/Ecu",
    "block": "{\"symbols\":[],\"statements\":[[7,\"form\",true],[10,\"class\",\"d-flex flex-column mt-5 pt-5 mx-auto col-6\"],[8],[0,\"\\n    \\n    \"],[7,\"div\",true],[10,\"class\",\"d-flex flex-row justify-content-around\"],[8],[0,\"\\n        \"],[7,\"label\",true],[10,\"for\",\"name\"],[10,\"class\",\"mt-5 mb-3  \"],[8],[0,\"Name:\"],[9],[0,\"\\n        \"],[7,\"input\",true],[10,\"name\",\"name\"],[10,\"id\",\"name\"],[10,\"class\",\"mt-5\"],[11,\"value\",[23,0,[\"model\",\"data\",\"attributes\",\"name\"]]],[10,\"type\",\"text\"],[8],[9],[0,\" \\n    \"],[9],[0,\"\\n    \\n    \"],[7,\"div\",true],[10,\"class\",\"d-flex flex-row justify-content-around\"],[8],[0,\"\\n        \"],[7,\"label\",true],[10,\"for\",\"domain\"],[10,\"class\",\"my-3\"],[8],[0,\"Domain:\"],[9],[0,\"\\n        \"],[7,\"input\",true],[10,\"name\",\"domain\"],[10,\"id\",\"domain\"],[11,\"value\",[23,0,[\"model\",\"data\",\"attributes\",\"domain\"]]],[10,\"type\",\"text\"],[8],[9],[0,\"\\n    \"],[9],[0,\"\\n\\n    \"],[7,\"div\",true],[10,\"class\",\"d-flex flex-row justify-content-around \"],[8],[0,\"\\n        \"],[7,\"label\",true],[10,\"for\",\"year\"],[10,\"class\",\"my-3\"],[8],[0,\"Year:\"],[9],[0,\"\\n        \"],[7,\"input\",true],[10,\"name\",\"year\"],[10,\"id\",\"year\"],[11,\"value\",[23,0,[\"model\",\"data\",\"attributes\",\"year\"]]],[10,\"type\",\"number\"],[8],[9],[0,\"\\n    \"],[9],[0,\"\\n\\n    \"],[7,\"div\",true],[10,\"class\",\"d-flex flex-row justify-content-around\"],[8],[0,\"\\n      \"],[7,\"label\",true],[10,\"for\",\"image\"],[10,\"class\",\"my-3\"],[8],[0,\"Image: \"],[9],[0,\"\\n      \"],[7,\"select\",true],[10,\"name\",\"image url\"],[10,\"id\",\"image\"],[10,\"class\",\"dropdown my-auto\"],[10,\"aria-placeholder\",\"Image Url\"],[8],[0,\"\\n        \"],[7,\"option\",true],[11,\"value\",[23,0,[\"model\",\"data\",\"attributes\",\"image\"]]],[10,\"selected\",\"\"],[8],[1,[23,0,[\"model\",\"data\",\"attributes\",\"image\"]],false],[9],[0,\"\\n        \"],[7,\"option\",true],[10,\"value\",\"https://fastly.picsum.photos/id/146/5000/3333.jpg?hmac=xdlFnzoavokA3U-bzo35Vk4jTBKx8C9fqH5IuCPXj2U\"],[8],[0,\"https://fastly.picsum.photos/id/146/5000/3333.jpg\"],[9],[0,\"\\n        \"],[7,\"option\",true],[10,\"value\",\"https://fastly.picsum.photos/id/153/4763/3155.jpg?hmac=GvglcvSHy1CSmpkqqF-7VSPsc67CmYQZ1CY-do9rh_A\"],[8],[0,\"https://fastly.picsum.photos/id/153/4763/3155.jpg\"],[9],[0,\"\\n        \"],[7,\"option\",true],[10,\"value\",\"https://fastly.picsum.photos/id/155/3264/2176.jpg?hmac=Zgf_oGMJeg18XoKBFmJgp2DgHMRYuorXlDx5wLII9nU\"],[8],[0,\"https://fastly.picsum.photos/id/155/3264/2176.jpg\"],[9],[0,\"\\n        \"],[7,\"option\",true],[10,\"value\",\"https://fastly.picsum.photos/id/127/4032/2272.jpg?hmac=QFoFT2_eb_DCqjdlj09UFgUHwI_zefDTBdECRz9lO5Q\"],[8],[0,\"https://fastly.picsum.photos/id/127/4032/2272.jpg\"],[9],[0,\"\\n      \"],[9],[0,\"\\n    \"],[9],[0,\"\\n\\n\"],[9],[0,\"  \\n\\n\"],[0,\"\\n\"],[7,\"div\",true],[10,\"class\",\"d-flex justify-content-center\"],[8],[0,\"\\n  \"],[7,\"button\",true],[11,\"onclick\",[28,\"action\",[[23,0,[]],\"updateStudent\"],null]],[10,\"class\",\"my-5 btn btn-success\"],[10,\"type\",\"submit\"],[8],[0,\"Update Student\"],[9],[0,\"\\n\"],[9],[0,\"\\n\\n\\n\"],[1,[22,\"outlet\"],false]],\"hasEval\":false}",
    "meta": {
      "moduleName": "student-portal/templates/student-detail.hbs"
    }
  });
});
;define("student-portal/templates/student", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _default = _exports.default = Ember.HTMLBars.template({
    "id": "iAxh7nCV",
    "block": "{\"symbols\":[\"student\"],\"statements\":[[1,[22,\"outlet\"],false],[0,\"\\n\\n\"],[7,\"div\",true],[8],[0,\"\\n  \"],[7,\"img\",true],[10,\"src\",\"https://blog.zohowebstatic.com/sites/zblogs/images/mail/blog_without_text-2020-07.gif\"],[10,\"alt\",\"zoho-gif\"],[8],[9],[0,\"\\n\"],[9],[0,\"\\n\"],[7,\"div\",true],[10,\"class\",\"row py-5 mx-auto d-flex justify-content-center \"],[8],[0,\"\\n\\n\"],[4,\"each\",[[23,0,[\"model\",\"data\"]]],null,{\"statements\":[[0,\"\\n    \"],[7,\"div\",true],[10,\"class\",\"col-3 card p-3 m-3 text-center card-bg\"],[8],[0,\"\\n      \"],[7,\"img\",true],[11,\"src\",[23,1,[\"attributes\",\"image\"]]],[10,\"class\",\"card-img-top card-img\"],[11,\"alt\",[23,1,[\"attributes\",\"name\"]]],[8],[9],[0,\"\\n      \"],[7,\"div\",true],[10,\"class\",\"card-body m-0\"],[8],[0,\"\\n        \"],[7,\"h5\",true],[10,\"class\",\"card-title\"],[8],[1,[23,1,[\"attributes\",\"name\"]],false],[9],[0,\"\\n        \"],[7,\"p\",true],[10,\"class\",\"card-text\"],[8],[1,[23,1,[\"attributes\",\"domain\"]],false],[0,\" - \"],[1,[23,1,[\"attributes\",\"year\"]],false],[9],[0,\"\\n        \"],[7,\"div\",true],[10,\"class\",\"d-flex justify-content-between\"],[8],[0,\"\\n          \"],[7,\"button\",true],[10,\"class\",\"btns\"],[11,\"onclick\",[28,\"action\",[[23,0,[]],\"openSidebar\",[23,1,[]]],null]],[8],[0,\"Details\"],[9],[0,\"\\n          \"],[5,\"link-to\",[],[[\"@route\",\"@model\"],[\"student-detail\",[23,1,[\"id\"]]]],{\"statements\":[[0,\"\\n            \"],[7,\"button\",true],[10,\"class\",\"btns\"],[8],[0,\"Update\"],[9],[0,\"\\n          \"]],\"parameters\":[]}],[0,\"\\n        \"],[9],[0,\"\\n\\n      \"],[9],[0,\"\\n      \"],[7,\"div\",true],[10,\"class\",\"social\"],[8],[0,\"\\n        \"],[7,\"i\",true],[10,\"class\",\"fa fa-linkedin-square\"],[8],[9],[0,\"\\n        \"],[7,\"i\",true],[10,\"class\",\"fa fa-facebook-f\"],[8],[9],[0,\"\\n        \"],[7,\"i\",true],[10,\"class\",\"fa fa-twitter\"],[8],[9],[0,\"\\n        \"],[7,\"i\",true],[10,\"class\",\"fa fa-whatsapp\"],[8],[9],[0,\"\\n      \"],[9],[0,\"\\n    \"],[9],[0,\"\\n\\n\"]],\"parameters\":[1]},null],[0,\"\\n\"],[9],[0,\"\\n\\n\\n\"],[4,\"if\",[[23,0,[\"isSidebarOpen\"]]],null,{\"statements\":[[0,\"  \"],[7,\"div\",true],[10,\"class\",\"sidebar\"],[8],[0,\"\\n    \"],[7,\"i\",true],[10,\"class\",\"fa fa-close d-flex justify-content-end mr-3 mt-3\"],[10,\"style\",\"font-size:28px;color:red\"],[11,\"onclick\",[28,\"action\",[[23,0,[]],\"closeSidebar\"],null]],[8],[9],[0,\"\\n    \"],[5,\"sidebar\",[],[[\"@selectedStudent\"],[[23,0,[\"selectedStudent\"]]]]],[0,\"\\n    \"],[7,\"div\",true],[10,\"class\",\"d-flex flex-row justify-content-around mx-auto my-5\"],[8],[0,\"\\n      \"],[7,\"button\",true],[10,\"class\",\"btn btn-danger \"],[11,\"onclick\",[28,\"action\",[[23,0,[]],\"deleteStudent\"],null]],[8],[0,\"Delete\"],[9],[0,\"\\n      \"],[7,\"button\",true],[10,\"class\",\"btn btn-primary \"],[11,\"onclick\",[28,\"action\",[[23,0,[]],\"closeSidebar\"],null]],[8],[0,\"Close\"],[9],[0,\"\\n    \"],[9],[0,\"\\n  \"],[9],[0,\"\\n\"]],\"parameters\":[]},null]],\"hasEval\":false}",
    "meta": {
      "moduleName": "student-portal/templates/student.hbs"
    }
  });
});
;define("student-portal/transforms/boolean", ["exports", "@ember-data/serializer/-private"], function (_exports, _private) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _private.BooleanTransform;
    }
  });
});
;define("student-portal/transforms/date", ["exports", "@ember-data/serializer/-private"], function (_exports, _private) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _private.DateTransform;
    }
  });
});
;define("student-portal/transforms/number", ["exports", "@ember-data/serializer/-private"], function (_exports, _private) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _private.NumberTransform;
    }
  });
});
;define("student-portal/transforms/string", ["exports", "@ember-data/serializer/-private"], function (_exports, _private) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _private.StringTransform;
    }
  });
});
;

;define('student-portal/config/environment', [], function() {
  var prefix = 'student-portal';
try {
  var metaName = prefix + '/config/environment';
  var rawConfig = document.querySelector('meta[name="' + metaName + '"]').getAttribute('content');
  var config = JSON.parse(decodeURIComponent(rawConfig));

  var exports = { 'default': config };

  Object.defineProperty(exports, '__esModule', { value: true });

  return exports;
}
catch(err) {
  throw new Error('Could not read config from meta tag with name "' + metaName + '".');
}

});

;
          if (!runningTests) {
            require("student-portal/app")["default"].create({"name":"student-portal","version":"0.0.0+933d06a4"});
          }
        
//# sourceMappingURL=student-portal.map
