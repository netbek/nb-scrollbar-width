/**
 * AngularJS service for detecting window and document dimensions
 *
 * @author Hein Bekker <hein@netbek.co.za>
 * @copyright (c) 2015 Hein Bekker
 * @license http://www.gnu.org/licenses/agpl-3.0.txt AGPLv3
 */

(function (window, angular, undefined) {
	'use strict';

	angular
		.module('nb.window', [])
		.factory('nbWindow', nbWindow);

	nbWindow.$inject = ['$window', '$document'];
	function nbWindow ($window, $document) {
		var document = $document[0];
		var documentElement = document.documentElement;
		var body = document.body;

		// Detect scrollbar width.
		var $body = angular.element(body);
		var $div = angular.element('<div style="width:50px; height:50px; overflow:hidden; position:absolute; top:-200px; left:-200px;"></div>');
		var $innerDiv = angular.element('<div style="height:200%; min-height:100px;"></div>');
		$div.append($innerDiv);
		$body.append($div);
		var w1 = $innerDiv[0].offsetWidth;
		$div.css('overflow-y', 'scroll');
		var w2 = $innerDiv[0].offsetWidth;
		$div.remove();
		var scrollbarWidth = w1 - w2;

		return {
			windowWidth: function () {
				return $window.document.documentElement.clientWidth;
			},
			windowHeight: function () {
				return $window.document.documentElement.clientHeight;
			},
			documentWidth: function () {
				return Math.max(
					body.scrollWidth, documentElement.scrollWidth,
					body.offsetWidth, documentElement.offsetWidth,
					documentElement.clientWidth);
			},
			documentHeight: function () {
				return Math.max(
					body.scrollHeight, documentElement.scrollHeight,
					body.offsetHeight, documentElement.offsetHeight,
					documentElement.clientHeight);
			},
			scrollbarWidth: function () {
				return scrollbarWidth;
			}
		};
	}
})(window, window.angular);