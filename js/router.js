/**
 * Created by jerry on 2017/1/9.
 */
angular.module("myApp.router", ["ui.router"])
    .config(function ($stateProvider, $urlRouterProvider) {
        //重定向首页
        $urlRouterProvider.otherwise('/home');
        //一级栏目
        //首页
        $stateProvider.state("home", {
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
                url: '/museumDetails',
                templateUrl: 'template/museumDetails.html',
                controller: 'MuseumDetails'
            })
            .state('museum.morecollection', {
                url: '/Mcollection',
                templateUrl: 'template/museumDetails_moreCollection.html',
                controller: 'MuseumDetailsMoreCollection'
            })
            .state('museum.moredisplay', {
                url: '/Mdisplay',
                templateUrl: 'template/museumDetails_moreDisplay.html',
                controller: 'MuseumDetailsMoreDisplay'
            })
            .state('museum.moredigization', {
                url: '/Mdigization',
                templateUrl: 'template/museumDetails_moreDigization.html',
                controller: 'MuseumDetailsMoreDigization'
            })
            //数字博物馆
            .state('digitization', {
                url: '/digitization/:museum',
                templateUrl: 'template/digitization.html',
                controller: 'Digization'
            })
            //藏品
            .state('collection', {
                url: '/collection/:museum/:type',
                views: {
                    '': {
                        templateUrl: 'template/collection.html',
                        controller: "Collection"
                    }
                }

            })
            .state('collectiondetails', {
                url: '/collection/collectiondetails/:type/:id',
                views: {
                    '': {
                        templateUrl: 'template/collectionDetails.html',
                        controller: "CollectionDetails"
                    }
                }
            })
            .state('Wiki', {
                url: '/wiki',
                templateUrl: 'template/Wiki.html'
            })
            .state('display', {
                url: '/display/:museum',
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
