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