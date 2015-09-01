Package.describe({
	name: 'gbit:maketable',
	version: '0.0.2',
	summary: 'A Blaze helper to creating html tables from objects',
	git: 'https://github.com/girassolbit/meteor-maketable.git',
	documentation: 'README.md'
});

Package.onUse(function(api) {
	api.versionsFrom('1.1.0.3');
	api.use(['underscore','ui'], 'client');
	api.addFiles('maketable.js', 'client');
	api.export('MakeTable', 'client');
});

Package.onTest(function(api) {
	api.use('tinytest');
	api.use('gbit:maketable');
	api.addFiles('maketable-tests.js','client');
});
