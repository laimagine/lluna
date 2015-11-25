/*
 * Copyright (c) 2015, LA Imagine. All rights reserved. http://www.laimagine.com
 *
 * The contents of this file are solely owned by LA Imagine.
 *
 * No portion of this file may be reproduced in any form without the explicit and
 * written permission from LA Imagine.
 *
 * THIS CODE AND INFORMATION ARE PROVIDED "AS IS" WITHOUT WARRANTY OF ANY
 * KIND, EITHER EXPRESSED OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND/OR FITNESS FOR A
 * PARTICULAR PURPOSE.
 *
 * <author>LA Imagine</author>
 * <email>contact@laimagine.com</email>
 */ 
define(function (require) {

	'use strict';

	//console.log('Start ');
	window.sessionStorage.setItem('maze', 'this.result');

	var router = require('./router'),
		mazeUtil = require('./mazeUtil'),
	    navigate = function() {
			// Add the different routes
			router.addRoute('help', require('./help'));
			router.addRoute('home', require('./home'));
			router.addRoute('message', require('./message'));
			router.navigate();
		},
		read = function(fileEntry) {
			//console.log('read Reading');
			fileEntry.file(function(file) {
				var reader = new FileReader();
				reader.onloadend = function(event) {
					//console.log('read Read ' + this.result);
					mazeUtil.maze(this.result);
					navigate();
				}
				reader.readAsText(file);
			})
		};

	try {
		window.resolveLocalFileSystemURL(cordova.file.dataDirectory + 'lluna.key',
			function(fileEntry) {
				//console.log('resolveLocalFileSystemURL Success ');
				read(fileEntry);
			}, function(error) {
				//console.log('resolveLocalFileSystemURL File does not exist ');

				window.resolveLocalFileSystemURL(cordova.file.dataDirectory, function(dirEntry) {
					dirEntry.getFile('lluna.key', {create: true, exclusive: false}, function(fileEntry) {
						//console.log('resolveLocalFileSystemURL Success Created file ');
						fileEntry.createWriter(function(writer) {
							//console.log('resolveLocalFileSystemURL Writing ');
							writer.onwriteend = function() {
								//console.log('Wrote ');
								read(fileEntry);
							};
							//console.log('resolveLocalFileSystemURL Writing ' + !!mazeUtil.getMaze());
							var blob = new Blob([mazeUtil.maze()], {type:'text/plain'});
							writer.write(blob);
						}, function(error1) {
							//console.log('resolveLocalFileSystemURLError Unable to write file ' + error1);
							navigate();
						});
					}, function(error2) {
						//console.log('resolveLocalFileSystemURL Error Unable to create file '+ error2);
						navigate();
					});
				}, function(error3) {
					//console.log('resolveLocalFileSystemURL Gaaaaaaaa '+ error3);
				});
			}
		);
	} catch(ex) {
		//console.log('Exception ');
		window.sessionStorage.setItem('maze', 'Exception ' + ex.message);
		navigate();
	}
});