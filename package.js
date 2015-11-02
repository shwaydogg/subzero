Package.describe({
  name: 'shwaydogg:subzero',
  version: '0.0.1',
  // Brief, one-line summary of the package.
  summary: '',
  // URL to the Git repository containing the source code for this package.
  git: 'https://github.com/shwaydogg/subzero',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.2.1');
  api.use('ecmascript');
  api.use([
    'templating',
  ], 'client');
  api.addFiles(['subZero.html'], 'client');
  api.addFiles(['subZero.js'], 'client');
});

Package.onTest(function(api) {
  api.use('ecmascript');
  api.use('tinytest');
  api.use('shwaydogg:subzero');
  api.addFiles('subzero-tests.js');
});
