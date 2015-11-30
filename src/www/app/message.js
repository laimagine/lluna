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
