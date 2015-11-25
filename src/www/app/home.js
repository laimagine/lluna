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

    var $ = require('jquery'),
		pageUtil = require('./pageUtil'),
		mazeUtil = require('./mazeUtil'),
		lastTick = 0,
		_WAIT_TIME = 30000,
		_CSS_LLUNA_KEY = 'lluna-key',
		_CSS_LLUNA_CONFIRM_KEY = 'lluna-confirm-key',
		_CSS_LLUNA_ERROR = 'lluna-error',
		_CSS_LLUNA_PASSWORD_LABEL = 'lluna-password-label',
		_CSS_LLUNA_PASSWORD = 'lluna-password',
		_CSS_LLUNA_GENERATE = 'lluna-generate';

    return {
        getHeader: function () {
            return pageUtil.getHeader('Lluna');
        },
        getContent: function () {
            var $form = pageUtil.getForm('lluna-form form-group'),
                $key = pageUtil.getPasswordField('key', 'Key', _CSS_LLUNA_KEY + ' form-control'),
                $confirmKey = pageUtil.getPasswordField('confirmKey', 'Confirm Key', _CSS_LLUNA_CONFIRM_KEY + ' form-control'),
                $error = pageUtil.getDiv(_CSS_LLUNA_ERROR + ' error'),
                $passwordSection = pageUtil.getDiv(),
                $passwordLabel = pageUtil.getSpan(_CSS_LLUNA_PASSWORD_LABEL),
                $password = pageUtil.getSpan(_CSS_LLUNA_PASSWORD),
                $generate = pageUtil.getButton(_CSS_LLUNA_GENERATE + ' btn', 'Create Password', function(event) {

					event.preventDefault();
					lastTick = Date.now();

					var $clickedKey = pageUtil.getByClass(_CSS_LLUNA_KEY),
						$clickedConfirmKey = pageUtil.getByClass(_CSS_LLUNA_CONFIRM_KEY),
						$clickedError = pageUtil.getByClass(_CSS_LLUNA_ERROR),
						$clickedPasswordLabel = pageUtil.getByClass(_CSS_LLUNA_PASSWORD_LABEL),
						$clickedPassword = pageUtil.getByClass(_CSS_LLUNA_PASSWORD),
						$clickedGenerate = pageUtil.getByClass(_CSS_LLUNA_GENERATE),
						key = pageUtil.getValue($clickedKey),
					    confirmKey = pageUtil.getValue($clickedConfirmKey),
						errorMessage;

					pageUtil.setText($clickedError, '');
					pageUtil.setText($clickedPasswordLabel, '');
					pageUtil.setText($clickedPassword, '');
					
					if (!key) {
						errorMessage = 'Key is required';
					} else if (!confirmKey) {
						errorMessage = 'Confirm Key is required';
					} else if (key !== confirmKey) {
						errorMessage = 'Key and Confirm Key must be equal';
					}

					if (errorMessage) {
						pageUtil.setText($clickedError, errorMessage);
					} else {
						pageUtil.setValue($clickedKey, '');
						pageUtil.setValue($clickedConfirmKey, '');
						pageUtil.setText($clickedError, '');
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
			return pageUtil.getDefaultFooter();
		}
    };
});
