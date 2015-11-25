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

    var pageUtil = require('./pageUtil');

    return {
        getHeader: function () {
            return pageUtil.getHeader('Lluna');
        },
        getContent: function () {
            var $div = pageUtil.getDiv(),
				$textHelp = pageUtil.getDiv('lluna-help-text',
					'<div class="header">Help:</div>' +
					'<div class="content">' + 
					' Remember that complex password you created?' +
					' <p/>' +
					' No? Don\'t worry, you aren\'t the only one that can\'t remember those #^&*ing hard passwords.' +
					' <p/>' +
					' <span class="lluna">Lluna</span> is here to solve that problem.' +
					' <div/>'),
				$textShortVersion = pageUtil.getDiv('lluna-help-text',
					'<div class="header">The short version:</div>' +
					'<div class="content">' + 
					' <span class="lluna">Lluna</span> takes really simple keys and creates complex passwords based on those keys.' +
					' <p/>' +
					' For example:' +
					' <ul>' +
					' <li>You enter the key: <i>MyYahooKey</i>' + 
					' <li><span class="lluna">Lluna</span> creates the password: <i>zD~5dbh5nY</i>' +
					' <li>Password has the same length as key' +
					' <li>You can copy password and paste it where needed' +
					'</ul>' +
					' <p/>' +
					' That\'s it.' +
					' <div/>'),
				$textLongVersion = pageUtil.getDiv('lluna-help-text',
					'<div class="header">The long version:</div>' +
					'<div class="content">There is no long version.</div>'),
				$faq = pageUtil.getDiv('lluna-help-text',
					'<div class="header">Advantages:</div>' +
					'<div class="content">' +
					' There is no need to remember #^&*ing hard passwords.' +
					' All you need to remember are the easy to remember keys.' +
					' <p/>' +
					' On your phone, <span class="lluna">Lluna</span> creates the same password for the same key.' +
					' Which means that you have to remember only the simple key and' +
					' <span class="lluna">Lluna</span> takes care of getting the #^&*ing hard password every time you need it.' +
					' <p/>' +
					' If you enter a different key, <span class="lluna">Lluna</span> creates different password.' +
					' Yep, it is that simple.' +
					' <p/>' +
					' Moreover, on different phones, <span class="lluna">Lluna</span> creates a different passwords for the same key.' +
					' So, be assured that your keys and passwords are on just your phone.' +
					' <p/>' +
					' Oh, did we mention that <span class="lluna">Lluna</span> does NOT save any of your information?' +
					' Yes, neither the keys nor the created passwords are saved anywhere unlike all those apps/services/vaults/blehs.' +
					' <p/>' +
					' For more information: ' +
					' <a href="http://www.laimagine.com">LA Imagine</a>' +
					' <div>'
					),
                $doneDiv = pageUtil.getDiv(),
                $done = pageUtil.getButton('lluna-help-ok', 'Awesome!', function(event) {
					pageUtil.navigate('home', event);
				});

            pageUtil.addItem($div, $textHelp);
            pageUtil.addItem($div, $textShortVersion);
            pageUtil.addItem($div, $textLongVersion);
            pageUtil.addItem($div, $faq);
            pageUtil.addItem($doneDiv, $done);
            pageUtil.addItem($div, $doneDiv);

            return $div;
		},
		getFooter: function() {
			return pageUtil.getDefaultFooter();
		}
    };
});
