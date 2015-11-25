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
				
				module = module || routes['home'];
				$('.app .menu').html('').append(module.getMenu ? module.getMenu(data, options) : '');
				$('.app .header').html('').append(module.getHeader ? module.getHeader(data, options) : '');
				$('.app .footer').html('').append(module.getFooter ? module.getFooter(data, options) : '');
				$('.app .container .content').html('').append(module.getContent ? module.getContent(data, options) : '');
				$('.app .message').html('').append(message.getContent());

				module.onRender && module.onRender(data, options);
			}
	    };
		
	return self;

});