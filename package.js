Package.describe({
  name: 'ahmedtabrez:admin',
  version: '0.0.1',
  // Brief, one-line summary of the package.
  summary: '',
  // URL to the Git repository containing the source code for this package.
  git: '',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.3');
  api.use([
    'session', 
    'standard-app-packages', 
    'materialize:materialize', 
    'poetic:materialize-scss', 
    'meteorhacks:fast-render', 
    'gildaspk:autoform-materialize', 
    'momentjs:moment',
    'ecmascript', 
    'iron:router', 
    'aldeed:simple-schema', 
    'aldeed:autoform', 
    'aldeed:collection2',
    'alanning:roles',
    'accounts-password',
    'ahmedtabrez:finance'
  ]);
  api.use(['templating'], 'client');

  api.addFiles(['client/main.html', 'client/index.html','client/templates.html', 'client/helpers.js', 'client/domEvents.js', 'lib/subscribe.js', 'client/init.js'], 'client');
  api.addFiles([
    'public/css/styles.css', 
    'public/css/material-icons.css',
    'public/css/materialize.clockpicker.css',
    'public/js/materialize.clockpicker.js' ], 'client');
  api.addFiles(['server/publish.js', 'server/methods.js', 'server/startup.js'], 'server');
  api.addFiles(['lib/routes.js', 'lib/collections.js']);
  api.mainModule('admin.js');
  api.mainModule('settings.js');
});


Package.onTest(function(api) {
  api.use(['ecmascript']);
  api.use('tinytest');
  api.use('ahmedtabrez:admin');
  api.mainModule('admin-tests.js');
});
