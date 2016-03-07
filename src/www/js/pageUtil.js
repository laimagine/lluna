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
      var $button = $('<a href="javascript:void(0)" class="label-floating button btn btn-primary ' + (css ? css : '') + '">' + value + '</div>');
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
      return pageUtil.getDiv(css);
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
      var $div = pageUtil.getDiv('form-group label-floating is-empty'),
        $label = $('<label class="control-label">' + displayName + '</label>'),
        $input = $('<input type="' + type + '" class="form-control input input-' + type + (css ? ' '  + css : '')  + '">');

        pageUtil.addItem($div, $label);
        pageUtil.addItem($div, $input);
        return $div;
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
      $item.addClass('hidden');
    },
    show: function($item) {
      $item.removeClass('hidden');
    },
    getMenu: function(text) {
      return '';
    },
    getHeader: function() {
      var $title = pageUtil.getDiv('page-header', 'l l u n a'),
          $sub = pageUtil.getDiv('lluna-notice', 'Passwords: Simple, Safe, Secure');
      pageUtil.addItem($title, $sub);
      return $title;
    },
    getFooter: function() {
      var $footer = $(
        '<div class="copyright">' +
          '<span>LA Imagine | All Rights Reserved</span>' +
        '</div>'
      );
      pageUtil.addEventHandler($footer, 'click', function(event) {
        event.preventDefault();
        window.open(encodeURI('http://www.laimagine.com'), '_system', 'location=yes');
      });
      return $footer;
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
    setError: function($item, errorMessage) {
      $item.closest('.form-group').addClass('has-error');
    },
    copyText: function($element) {

      var retValue = false,
          element = $element[0].firstChild;
      !document.queryCommandSupported("copy") && pageUtil.addAttribute($element, 'contenteditable', true);
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
