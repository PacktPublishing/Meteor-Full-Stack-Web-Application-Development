Package.describe({
  name: 'packtmeteor:testpack',
  version: '0.0.2',
  // Brief, one-line summary of the package.
  summary: 'Test package using server logging',
  // URL to the Git repository containing the source code for this package.
  git: '',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.1.0.2');
  api.addFiles('testpack.js','client');
  api.addFiles('servertestpack.js','server');
  if (api.export){
    api.export('TestPack');
  }
});

Package.onTest(function(api) {
  api.use('tinytest');
  api.use('packtmeteor:testpack');
  api.addFiles('testpack-tests.js');
});

Npm.depends({
  "colors": "0.6.2"
})
