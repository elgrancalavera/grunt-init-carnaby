/*
 * grunt-init-carnaby
 * https://github.com/elgrancalavera/grunt-init-carnaby
 *
 * Copyright (c) 2013 M&CSaatchi
 * Licensed under the MIT license.
 */
'use-strict';
var path = require('path');

exports.description = 'The Carnaby workflow scaffolding template.';

// Template-specific notes to be displayed before question prompts.
exports.notes = '';

// Template-specific notes to be displayed after question prompts.
exports.after = 'You should now install project dependencies with _npm ' +
  'install_. After that, you may execute project tasks with _grunt_.';

// Any existing file or directory matching this wildcard will cause a warning.
exports.warnOn = '*';

exports.template = function (grunt, init, done) {
  // The package.json file for this grunt project
  var pkg = grunt.file.readJSON(path.join(__dirname, 'package.json'));

  // generate dependencies
  var ignoredDeps = [
    'grunt-contrib-nodeunit'
  ];

  grunt.util._.each(ignoredDeps, function (key) {
    delete pkg.devDependencies[key];
  });

  init.process({type: 'carnaby'}, [
    init.prompt('name'),
    init.prompt('title'),
    init.prompt('description', 'A Carnaby project.'),
    init.prompt('version'),
    init.prompt('repository'),
    init.prompt('homepage'),
    init.prompt('bugs'),
    init.prompt('licenses'),
    init.prompt('grunt_version'),
    init.prompt('node_version', grunt.package.engines.node)

  ], function(err, props) {

    props.author_name = pkg.name;
    props.author_url = pkg.author.url;
    props.author_email = pkg.author.email;
    props.main = 'Gruntfile.js';
    props.npm_test = 'grunt test';

    props.devDependencies = pkg.devDependencies;

    // Files to copy (and process).
    var files = init.filesToCopy(props);
    grunt.verbose.writeflags(props, 'props');
    grunt.verbose.writeflags(files, 'files');

    // Add properly-named license files.
    init.addLicenseFiles(files, props.licenses);

    // Actually copy (and process) files.
    init.copyAndProcess(files, props);

    // Generate package.json file.
    init.writePackageJSON('package.json', props);

    // All done!
    done();
  });
};
