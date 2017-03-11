/*jshint node:true*/
"use strict";

module.exports = function(grunt) {
	grunt.loadNpmTasks('grunt-mocha-test');

	grunt.initConfig({
		mochaTest: {
			test: {
				src: ['test/**/*.js'],
				options: {
					reporter: 'spec',
				},
			},
		},
	});

	grunt.registerTask('test', ['mochaTest']);
	grunt.registerTask('default', ['test']);
};
