/**
  * The MIT License (MIT)
  *
  * Copyright (c) 2015 laimagine
  *
  * Permission is hereby granted, free of charge, to any person obtaining a copy
  * of this software and associated documentation files (the "Software"), to deal
  * in the Software without restriction, including without limitation the rights
  * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
  * copies of the Software, and to permit persons to whom the Software is
  * furnished to do so, subject to the following conditions:
  *
  * The above copyright notice and this permission notice shall be included in all
  * copies or substantial portions of the Software.
  *
  * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
  * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
  * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
  * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
  * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
  * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
  * SOFTWARE.
  *
  * <author>LA Imagine</author>
  * <email>contact@laimagine.com</email>
  */
define(function (require) {

  'use strict';

  var app = {

    initialize: function() {
      this.bindEvents();
    },

    bindEvents: function() {
      document.addEventListener('deviceready', this.onDeviceReady, false);
    },

    onDeviceReady: function() {
      app.receivedEvent('deviceready');
    },

    receivedEvent: function(id) {
      //console.log('Start ');
      window.sessionStorage.setItem('maze', 'this.result');

      var $ = require('jquery'),
        router = require('./router'),
        navigate = function() {
          // Add the different routes
          router.addRoute('help', require('./help'));
          router.addRoute('home', require('./home'));

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
    }
  };
  app.initialize();

});
