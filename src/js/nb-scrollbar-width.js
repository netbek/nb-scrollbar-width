/**
 * AngularJS service for detecting scrollbar width
 *
 * @author Hein Bekker <hein@netbek.co.za>
 * @copyright (c) 2015 Hein Bekker
 * @license http://www.gnu.org/licenses/agpl-3.0.txt AGPLv3
 */

(function (window, angular, undefined) {
	'use strict';

	angular
		.module('nb.scrollbarWidth', [])
		.factory('nbScrollbarWidth', nbScrollbarWidth);

	nbScrollbarWidth.$inject = ['$window'];
	function nbScrollbarWidth ($window) {
		var body = $window.document.documentElement;
		var $body = angular.element(body);
		var $div = angular.element('<div style="width:50px; height:50px; overflow:hidden; position:absolute; top:-200px; left:-200px;"></div>');
		var $innerDiv = angular.element('<div style="height:200%; min-height:100px;"></div>');
		$div.append($innerDiv);
		$body.append($div);
		var w1 = $innerDiv[0].offsetWidth;
		$div.css('overflow-y', 'scroll');
		var w2 = $innerDiv[0].offsetWidth;
		$div.remove();

		return w1 - w2;
	}
})(window, window.angular);