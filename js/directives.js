/**
 * Created by jerry on 2017/1/9.
 */
'use strict';

/* Directives */
angular.module('myApp.directives', [])
    .directive('PagePlugs', [function () {
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
                console.log(scope.$last);
                if (scope.$last) {
                    // 这个判断意味着最后一个 OK

                    scope.$eval(attrs.repeatDone)    // 执行绑定的表达式
                }
            }
        }
    })
    .directive('firstcomment',function(){
        return{
            restrict: 'ECMA',
            templateUrl:'directive/firstcomment.html',
            replace: true,
            link:function(scope,element,attrs){
                scope.imgurl=attrs.imgurl;
                scope.username=attrs.username;
                scope.time=attrs.time;
                scope.content=attrs.content;
                scope.otherscommentsstatus=false;

            }
        }
    })
    .directive('otherscomments',function(){
        return{
            restrict: 'ECMA',
            templateUrl:'directive/othercomment.html',
            replace: true,
            link:function(scope,element,attrs){
                scope.imgurl=attrs.imgurl;
                scope.username=attrs.username;
                scope.time=attrs.time;
                scope.content=attrs.content;
                scope.showOthersComment=function(e){
                    e.preventDefault();
                    console.log(123)
                    var hasshow=angular.element(e.target).parent().next().hasClass("show");
                    if(hasshow){
                        angular.element(e.target).html('*展开回复∨');
                        angular.element(e.target).parent().next().removeClass("show");
                    }
                    else{
                        angular.element(e.target).html('*收起回复∧');
                        angular.element(e.target).parent().next().addClass("show");
                    }
                }
            }
        }
    })
    .directive('reply',function(){
        return{
            restrict:'EAMC',
            templateUrl:'directive/reply.html',
            scope:true,
            replace:true,
            link:function(scope,element,attrs){
                $('.emotionsmall').qqFace({
                    id: 'facebox',
                    assign: 'saytext',
                    path: 'img/arclist/'//表情存放的路径
                });
            }
        }
    })
    .directive('nohavemore',function(){
        return{
            restrict:"EAMC",
            templateUrl:'directive/nomore.html',
            scope:true,
            replace:true,
            link:function(scope,elment,attrs){
                elment.css({
                    width:attrs.nwidth+'px',
                    height:attrs.nheight+'px'
                })
            }
        }
    })
;

    // .directive('scrollbar',function(){
    //     return{
    //         restrict:'EAMC',
    //         scope:true,
    //         replace:false,
    //         link:function(scope,elements,attrs){
    //             console.log(scope.cityid);
    //             elements.mCustomScrollbar({
    //             });
    //             scope.changeCity=function(){
    //                 scope.change=function(e){
    //                     scope.cityid.id=angular.element(e.target)[0].id.slice(4)
    //                     scope.cityData=response[$scope.cityid.id-1];
    //                     $(".content").mCustomScrollbar("update");
    //                 }
    //             }
    //         }
    //     }
    // })
