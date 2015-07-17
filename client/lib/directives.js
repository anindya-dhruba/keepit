angular.module("keepit").directive('time', function () {
	return {
		restrict: 'E',
		scope: {
			time: '=of'
		},
		template: "<span am-time-ago='time' title=\"{{time | amDateFormat:'dddd, MMMM Do YYYY, h:mm:ss a'}}\"></span>"
	};
});