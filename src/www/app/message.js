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
        getContent: function () {
            var $div = pageUtil.getDiv('lluna-message'),
				$notice = pageUtil.getDiv('notice', 'ADVERTISEMENT'),
				$imageSection = pageUtil.getDiv('image', '<img src="./img/ad.png"></img>'),
				$textSection = pageUtil.getDiv('text'),
				$headerSection = pageUtil.getDiv('header', 'LA Imagine'),
				$contentSection = pageUtil.getDiv('content', 'For more information: <a href="#">LA Imagine</a>'),
				$clearSection = pageUtil.getDiv('clear'),
				fnOpenLink = function(event) {
					event.preventDefault();
					window.open(encodeURI('http://www.laimagine.com'), '_system', 'location=yes');
				};

			pageUtil.addEventHandler($imageSection, 'click', fnOpenLink);
			pageUtil.addEventHandler($contentSection, 'click', fnOpenLink);
            pageUtil.addItem($div, $notice);
            pageUtil.addItem($div, $imageSection);
            pageUtil.addItem($div, $textSection);
            pageUtil.addItem($textSection, $clearSection);
            pageUtil.addItem($textSection, $headerSection);
            pageUtil.addItem($textSection, $contentSection);
            pageUtil.addItem($textSection, $clearSection);

            return $div;
		}
    };
});
