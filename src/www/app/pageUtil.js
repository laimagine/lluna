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
	    router = require('./router');

    var pageUtil = {
		getButton: function(css, value, clickHander, type) {
			type = type || 'button';
			var $button = $('<input type="' + type + '" class="button btn ' + (css ? css : '') + '" value="' + value + '">');
			clickHander && pageUtil.addEventHandler($button, 'click', clickHander);
			return $button;
		},
		getDiv: function(css, text) {
			return $('<div class="div ' + (css ? css : '')  + '">' + (text ? text : '') + '</div>');
		},
		getSpan: function(css, text) {
			return $('<span class="span ' + (css ? css : '')  + '">' + (text ? text : '') + '</span>');
		},
		getForm: function(css) {
			return $('<div class="form form-horizontal ' + (css ? css : '') + '"></div>');
		},
		getLink: function(css, text, href) {
			var $link = $('<a class="link ' + (css ? css : '') + '">' + text + '</a>');
			pageUtil.addEventHandler($link, 'click', function(event) {
				pageUtil.navigate(href, event);
			});
			return $link;
		},
		getExternalLink: function(css, text, href) {
			var $link = $('<a class="link ' + (css ? css : '') + '">' + text + '</a>');
			pageUtil.addEventHandler($link, 'click', function(event) {
				window.open(href, '_system');
				return false;
			});
			return $link;
		},
		getInputTextField: function(fieldName, displayName, css, type) {
			type = type || 'text';
			return $('<input name="' + fieldName + '" type="' + type + '" class="input input-' + type + (css ? ' '  + css : '')  + '" placeholder="' + displayName + '">');
		},
		getPasswordField: function(fieldName, displayName, css) {
			return pageUtil.getInputTextField(fieldName, displayName, css, 'password');
		},
		getByClass: function(className) {
			return $('.' + className);
		},
		addAttribute: function($item, attribute, value) {
			$item.attr(attribute, value);
		},
		addItem: function($parent, $child) {
			$parent.append($child);
		},
		addEventHandler: function($field, event, handler) {
			$.removeEvent($field, event);
			$field.on(event, handler);
		},
		hide: function($item) {
			$item.hide();
		},
		show: function($item) {
			$item.show();
		},
		getMenu: function(text) {
			return '';
		},
		getHeader: function(text) {
			return pageUtil.getDiv('page-header', (text || 'Lluna'));
		},
		getDefaultFooter: function(text) {
			return $(
				'<div class="copyright">' +
					'<span>' + (text || 'LA Imagine All Rights Reserved') + '</span>' +
				'</div>'
			);
		},
		getValue: function($item) {
			return $item.val();
		},
		setValue: function($item, value) {
			$item.val(value);
		},
		setText: function($item, value) {
			$item.text(value);
		},
		copyText: function($element) {

			var retValue = false,
			    element = $element[0].firstChild;
			
			!document.queryCommandSupported('Copy') && pageUtil.addAttribute($element, 'contenteditable', true);
			if (window.getSelection && document.createRange) {
				var range = document.createRange(),
				    selection = window.getSelection();
				range.selectNodeContents(element);
				selection.removeAllRanges();
				selection.addRange(range);
				retValue = document.execCommand('copy');
			} else if (document.body.createTextRange) {
				range = document.body.createTextRange();
				range.moveToElementText(element);
				range.select();
				retValue = true;
			}
			return retValue;
		},
		clear: function(selector, delay) {
			delay = delay ? delay : 10;
			setTimeout(function() {
				$(selector).html('');
			}, delay);
		},
		navigate: function(href, event) {
			event && event.preventDefault();
			router.navigate('#' + href);
		}
    };

	return pageUtil;
});