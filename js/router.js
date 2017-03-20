/**
 * Created by jerry on 2017/1/9.
 */
angular.module("myApp.router", ["ui.router"])
    .config(function ($stateProvider, $urlRouterProvider) {
        //重定向首页
        $urlRouterProvider.otherwise('/home');
        //一级栏目
        //首页
        $stateProvider
            .state("home", {
            url: '/home',
            templateUrl: 'template/index_v_1.0.html',
            controller: "index_parentControl"
            })
            //登录
            .state('login', {
                url: '/loginPage',
                templateUrl: "template/login.html",
                controller: 'login'
            })
            //注册
            .state('Register',{
                url:'/Register',
                templateUrl:'template/register.html',
                controller:'Register'
            })
            //策展列表
            .state('ablum',{
                url:'/ablum',
                templateUrl:'template/album.html',
                controller:'Album'
                }
            )
            //策展详情
            .state('ablumdetails',{
                url:'/ablumdetails',
                templateUrl:'template/ablum_details.html',
                controller:'AlbumDetails',
            })
            //博物
            .state('museum', {
                url: '/museum',
                templateUrl: 'template/museum.html',
                controller: 'Museum'
            })
            .state('museum.museumMap', {
                url: '/museumMap',
                templateUrl: 'template/museumMap.html',
                controller: 'MuseumMap'
            })
            .state('museum.details', {
                url: '/museumDetails/:id',
                templateUrl: 'template/museumDetails.html',
                controller: 'MuseumDetails'
            })
            //数字博物馆
            .state('digitization', {
                url: '/digitization/:museum/:id',
                templateUrl: 'template/digitization.html',
                controller: 'Digization'
            })
            //藏品
            .state('collection', {
                url: '/collection/:museum/:type/:keywords/:id',
                views: {
                    '': {
                        templateUrl: 'template/collection.html',
                        controller: "Collection"
                    }
                }
            })
            .state('collectiondetails', {
                url: '/collectiondetails/:type/:id',
                views: {
                    '': {
                        templateUrl: 'template/collectionDetails.html',
                        controller: "CollectionDetails"
                    }
                }
            })
            .state('collectinodetailsvideo',{
                url:'/collectinodetailsvideo/:type/:id',
                views: {
                    '': {
                        templateUrl: 'template/collectionDetailsVideo.html',
                        controller: "CollectionDetailsVideo"
                    }
                }
            })
            .state('Wiki', {
                url: '/wiki',
                templateUrl: 'template/Wiki.html',
                controller:'wiki'
            })
            .state('display', {
                url: '/display/:museum/:id',
                templateUrl: 'template/display.html',
                controller: 'Displaylist'
            })
            .state('displaydetails', {
                url: '/displayDetails/:type/:id',
                templateUrl: 'template/display_details.html',
                controller: 'Display.Details'
            })

        ;
    })
