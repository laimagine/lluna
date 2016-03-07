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
      pageUtil = require('./pageUtil'),
      mazeUtil = require('./mazeUtil'),
      lastTick = 0,
      _WAIT_TIME = 30000,
      _CSS_LLUNA_KEY = 'lluna-key',
      _CSS_LLUNA_CONFIRM_KEY = 'lluna-confirm-key',
      _CSS_LLUNA_ERROR = 'lluna-error',
      _CSS_LLUNA_PASSWORD_SECTION = 'lluna-password-section',
      _CSS_LLUNA_PASSWORD_LABEL = 'lluna-password-label',
      _CSS_LLUNA_PASSWORD = 'lluna-password',
      _CSS_LLUNA_GENERATE = 'lluna-generate';

    return {
        getHeader: function () {
            return pageUtil.getHeader();
        },
        getContent: function () {
          var $form = pageUtil.getForm('lluna-form'),
            $key = pageUtil.getPasswordField('key', 'Key', _CSS_LLUNA_KEY + ' form-control'),
            $confirmKey = pageUtil.getPasswordField('confirmKey', 'Confirm Key', _CSS_LLUNA_CONFIRM_KEY + ' form-control'),
            $error = pageUtil.getDiv(_CSS_LLUNA_ERROR + ' error alert alert-dismissible alert-danger hidden'),
            $passwordSection = pageUtil.getDiv(_CSS_LLUNA_PASSWORD_SECTION + ' alert alert-dismissible alert-info hidden'),
            $passwordLabel = pageUtil.getSpan(_CSS_LLUNA_PASSWORD_LABEL),
            $password = pageUtil.getSpan(_CSS_LLUNA_PASSWORD),
            $generate = pageUtil.getButton(_CSS_LLUNA_GENERATE + ' btn', 'Create Password', function(event) {

              event.preventDefault();
              lastTick = Date.now();

              var $clickedKey = pageUtil.getByClass(_CSS_LLUNA_KEY),
                $clickedConfirmKey = pageUtil.getByClass(_CSS_LLUNA_CONFIRM_KEY),
                $clickedError = pageUtil.getByClass(_CSS_LLUNA_ERROR),
                $clickedPasswordLabel = pageUtil.getByClass(_CSS_LLUNA_PASSWORD_LABEL),
                $clickedPasswordSection = pageUtil.getByClass(_CSS_LLUNA_PASSWORD_SECTION),
                $clickedPassword = pageUtil.getByClass(_CSS_LLUNA_PASSWORD),
                $clickedGenerate = pageUtil.getByClass(_CSS_LLUNA_GENERATE),
                key = pageUtil.getValue($clickedKey),
                confirmKey = pageUtil.getValue($clickedConfirmKey),
                errorMessage;

              pageUtil.setText($clickedPasswordLabel, '');
              pageUtil.setText($clickedPassword, '');

              if (!key) {
                errorMessage = 'Key is required';
                pageUtil.setError($clickedKey);
              } else if (!confirmKey) {
                errorMessage = 'Confirm Key is required';
                pageUtil.setError($clickedConfirmKey);
              } else if (key !== confirmKey) {
                errorMessage = 'Key and Confirm Key must match';
                pageUtil.setError($clickedConfirmKey);
              }

              if (errorMessage) {
                pageUtil.setText($clickedError, errorMessage);
                pageUtil.show($clickedError);
                pageUtil.hide($clickedPasswordSection);
              } else {
                pageUtil.setValue($clickedKey, '');
                pageUtil.setValue($clickedConfirmKey, '');
                pageUtil.setText($clickedError, '');
                pageUtil.hide($clickedError);
                pageUtil.show($clickedPasswordSection);
                pageUtil.setText($clickedPassword, getPassword(key));
                if (pageUtil.copyText($clickedPassword)) {
                  pageUtil.setText($clickedPasswordLabel, 'Password copied to clipboard. Paste where needed.');
                  pageUtil.setText($clickedPassword, '');
                } else {
                  pageUtil.setText($clickedPasswordLabel, 'Generated password is: ');
                }
              }

              setTimeout(function() {
                if (Date.now() >= (lastTick + _WAIT_TIME)) {
                  pageUtil.setValue($clickedKey, '');
                  pageUtil.setValue($clickedConfirmKey, '');
                  pageUtil.setText($clickedError, '');
                  pageUtil.setText($clickedPasswordLabel, '');
                  pageUtil.setText($clickedPassword, '');
                  pageUtil.hide($clickedPasswordSection);
                  pageUtil.hide($clickedError);
                }
              }, _WAIT_TIME);
            }),
            $help = pageUtil.getLink('lluna-help', 'Help?', 'help'),
            getPassword = function(key) {
              var password = mazeUtil.getPassword(key);
              if (!password) {
                password = 'There was an error. Please restart the app and try again.';
              }
              return password;
            };
          pageUtil.addItem($form, $key);
          pageUtil.addItem($form, $confirmKey);
          pageUtil.addItem($form, $generate);
          pageUtil.addItem($form, $help);
          pageUtil.addItem($form, $error);
          pageUtil.addItem($form, $passwordSection);
          pageUtil.addItem($passwordSection, $passwordLabel);
          pageUtil.addItem($passwordSection, $password);

          return $form;
      },
      getFooter: function() {
        return pageUtil.getFooter();
      }
    };
});
