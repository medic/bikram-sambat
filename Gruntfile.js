/*jshint node:true*/
"use strict";

module.exports = function(grunt) {
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-mocha-test');

	grunt.initConfig({
		jshint: {
			src: {
				src: ['src/**/*.js'],
				options: {
					esversion: 3,
					predef: ['module'],
					undef: true,
					unused: true,
				},
			},
			test: {
				src: ['Gruntfile.js', 'package.json', 'test/**/*.js'],
				options: {
					esversion: 6,
					node: true,
					predef: ['describe', 'it'],
					undef: true,
					unused: true,
				},
			},
		},
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
	grunt.registerTask('default', ['jshint', 'test']);
};
