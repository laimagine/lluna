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

	var _LOWER_CASE_LETTERS = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'],
		_UPPER_CASE_LETTERS = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'],
		_NUMBERS = ['0','1','2','3','4','5','6','7','8','9'],
		specialCharacters = ['!','_','$','~'],
		getShuffled = function(array) {
			var shuffled = array.slice(),
			    top = shuffled.length,
			    temp,
				current;
			while(top) {
				current = Math.floor(Math.random() * top);
				temp = shuffled[current];
				shuffled[current] = shuffled[top];
				shuffled[top] = temp;
				top--;
			}
			return shuffled;
		},
		getPermittedCharacters = function() {
			return [_LOWER_CASE_LETTERS.join(''),
					_UPPER_CASE_LETTERS.join(''),
					_NUMBERS.join(''),
					specialCharacters.join('')].join('').split('');
		},
		mazeUtil = {
			maze: function(value) {
				if (value) {
					//console.log('maze value 1 ' + !!value);
					window.sessionStorage.removeItem('mazekey');
					window.sessionStorage.setItem('mazekey', value);
				} else {
					value = window.sessionStorage.getItem('mazekey');
					//console.log('maze value 2 ' + !!value);
					if(!value) {
						for (var i = 0; i < 15; i++) {
							value = value + getShuffled(getPermittedCharacters()).join('');
						}
						window.sessionStorage.removeItem('mazekey');
						window.sessionStorage.setItem('mazekey', value);
						//console.log('maze value 3 ' + !!value);
					}
					return value;
				}
			},
			getPassword: function(key) {
				var maze = mazeUtil.maze(),
					password = [],
					missingL = true,
					missingU = true,
					missingN = true,
					missingS = true,
					index = 0;

				if (maze) {
					//console.log('getPassword maze 1 ' + !!maze);
					for (var i = 0; i < key.length; i++) {
						index = (index + key.charCodeAt(i)) % maze.length;
					}

					//console.log('getPassword index 1 ' + !!index);
					while (missingL || missingU || missingN || missingS) {
						if (index % maze.length == 0) {
							break;
						}
						var nextChar = maze[index];
						if (missingL && _LOWER_CASE_LETTERS.indexOf(nextChar) >= 0) {
							password.push(nextChar);
							missingL = false;
						} else if (missingU && _UPPER_CASE_LETTERS.indexOf(nextChar) >= 0) {
							password.push(nextChar);
							missingU = false;
						} else if (missingN && _NUMBERS.indexOf(nextChar) >= 0) {
							password.push(nextChar);
							missingN = false;
						} else if (missingS && specialCharacters.indexOf(nextChar) >= 0) {
							password.push(nextChar);
							missingS = false;
						}
						index++;
					}
					//console.log('getPassword password 1 ' + !!password);

					for (i = 4; i < key.length; i++) {
						index = (index + key.charCodeAt(i)) % maze.length;
						password.push(maze[index]);
					}
					//console.log('getPassword password 2 ' + !!password);

					return password.join('');
				}
			}
		};

	return mazeUtil;
});
