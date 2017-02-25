/**
 * Created by jerry on 2017/1/9.
 */
'use strict';

/* Directives */
angular.module('myApp.directives', []).directive('PagePlugs', [function () {
    return {
        restrict: 'C',
        template: '<div><a href="" ng-click="getpage()"></a></div>',
        replace: true,
        link:function ($scope) {
        }
    };
}])
    .directive('repeatDone', function() {
        return {
            link: function(scope, element, attrs) {
                if (scope.$last) {
                    // 这个判断意味着最后一个 OK
                    scope.$eval(attrs.repeatDone)    // 执行绑定的表达式
                }
            }
        }
    })
;