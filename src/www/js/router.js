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

  var $ = require('jquery'),
      routes = {},
    self = {
      addRoute: function(hash, module) {
        routes[hash] = module;
      },
      navigate: function(href, data, options) {

        var url = href || $(location).attr('href'),
          hashIndex = url.indexOf('#'),
          hash = hashIndex >= 0 ? url.substring(hashIndex + 1) : 'home',
          module = routes[hash],
          message = routes['message'];

        module = module || routes['dash'];
        $('.app .menu').html('').append(module.getMenu ? module.getMenu(data, options) : '');
        $('.app .header').html('').append(module.getHeader ? module.getHeader(data, options) : '');
        $('.app .footer').html('').append(module.getFooter ? module.getFooter(data, options) : '');
        $('.app .container .content').html('').append(module.getContent ? module.getContent(data, options) : '');

        module.onRender && module.onRender(data, options);
    }
  };

  return self;

});
