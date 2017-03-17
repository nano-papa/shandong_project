/**
 * Created by jerry on 2017/1/9.
 */
'use strict';

/* Controllers */
angular.module('myApp.controllers', [])
    .controller('ParentControl', ['$scope', '$rootScope','$state','$http', 'ipCookie','$animate','$window',function ($scope, $rootScope,$state,$http,ipCookie,$animate,$window) {
        $rootScope.showIndex = true;
        $rootScope.userinfor=ipCookie('userinfor');
        $scope.logout=function(e){
            e.preventDefault();
            $http({
                method:'GET',
                url:'../front/loginOut.do'
            })
                .success(function(){
                    console.log('登出成功！');
                    $window.location.reload();
                    ipCookie('userinfor','');
                    $rootScope.userinfor='';
                })
        }
        $scope.goback=function(e){
            e.preventDefault();
            $window.open('../toLogin.do');
        }
    }])
    //登录
    .controller('login', ['$scope', '$rootScope', '$http', '$state','locals','ipCookie','$window', function ($scope, $rootScope, $http, $state,locals,ipCookie,$window) {
        $rootScope.showIndex = false;
        var height = $(window).height();
        $('.login').css('height', height);
        $scope.error=ipCookie('error');
        if(ipCookie('userinfor')){
            layer.msg('请先退出当前登录');
            $state.go('home');
        }
        // console.log( $scope.error);
        $scope.showForm = function () {
            $http({
                method: "POST",
                url: "../frontLogin.do",
                data:{
                    phone:$scope.username,
                    password:$scope.userpwd,
                    verificationCode:$scope.verificationcode
                },
                headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                transformRequest: function (obj) {
                    var str = [];
                    for (var s in obj) {
                        str.push(encodeURIComponent(s) + "=" + encodeURIComponent(obj[s]));
                    }
                    return str.join("&");
                }
            }).success(function (response) {
                console.log(response);
                $scope.error=response.data.errorTimes;
                ipCookie('error',response.data.errorTimes);
                $scope.tip=response.data.tipMessage;
                $scope.errormsg=true;
                if(response.data.sessionAdminName){
                    var expires={expires:7}
                    ipCookie('userinfor',response.data,expires);
                    $rootScope.userinfor=response.data;
                    $state.go('home');
                }
            })

        }
        $scope.changeimg=function(e){
               angular.element(e.target).attr('src','../getImgCode.do?'+Math.random());
        }
    }])
    //注册
    .controller('Register',['$scope','$rootScope','$http','$interval','$state','ipCookie',function($scope,$rootScope,$http,$interval,$state,ipCookie){
        $rootScope.showIndex = true;
        $scope.status='获取验证码';
        $scope.send=true;
        $scope.first=true;
        $scope.secend=false;
        $scope.countdown=function () {
            if(!$scope.phone){
                layer.alert("请输入手机号",{icon:2});
                return;
            }else if(!$scope.piccode){
                layer.alert("请输入图形验证码",{icon:2});
                return;
            }
            else{
                $scope.count=59;
                $scope.send=false;
                $scope.status=$scope.count+'s可重发';
                var interval=$interval(function(){
                    $scope.status=($scope.count-1)+'s可重发';
                    $scope.count--;
                    if($scope.count<0){
                        $scope.count=59;
                        $scope.status='获取验证码';
                        $scope.send=true;
                        $interval.cancel(interval);
                    }
                },1000)
                $http({
                    method:"GET",
                    url:'../sendSecretCode.do',
                    params:{phone:$scope.phone,verificationCode:$scope.piccode}
                })
                    .success(function(response){
                        console.log(response.success)
                    })
            }

        }
        $scope.openmsg=function(){
            layer.open({
                type: 1
                ,title: false //不显示标题栏
                ,closeBtn: false
                ,area:  ['700px', '500px']
                ,shade: 0.8
                ,id: 'LAY_layuipro' //设定一个id，防止重复弹出
                ,resize: false
                ,btn: ['已阅读']
                ,btnAlign: 'c'
                ,moveType: 1 //拖拽模式，0或者1
                ,content: '<div style="font-size:12px;background:#fff;color:#333;padding:20px;overflow-y: scroll;line-height:1.5 ">一、总则1.1 保宝网的所有权和运营权归深圳市永兴元科技有限公司所有。1.2 用户在注册之前，应当仔细阅读本协议，并同意遵守本协议后方可成为注册用户。一旦注册成功，则用户与保宝网之间自动形成协议关系，用户应当受本协议的约束。用户在使用特殊的服务或产品时，应当同意接受相关协议后方能使用。' +
                '1.3 本协议则可由保宝网随时更新，用户应当及时关注并同意本站不承担通知义务。本站的通知、公告、声明或其它类似内容是本协议的一部分、服务内容2.1 保宝网的具体内容由本站根据实际情况提供。2.2 本站仅提供相关的网络服务，除此之外与相关网络服务有关的设备(如个人电脑、手机、及其他与接入互联网或移动网有关的装置)及所需的费用(如为接入互联网而支付的电话费及上网费、为使用移动网而支付的手机费)均应由用户自行负担。三、用户帐号3.1 经本站注册系统完成注册程序并通过身份认证的用户即成为正式用户，可以获得本站规定用户所应享有的一切权限；未经认证仅享有本站规定的部分会员权限。保宝网有权对会员的权限设计进行变更。3.2 用户只能按照注册要求使用真实姓名，及身份证号注册。用户有义务保证密码和帐号的安全，用户利用该密码和帐号所进行的一切活动引起的任何损失或损害，由用户自行承担全部责任，本站不承担任何责任。如用户发现帐号遭到未授权的使用或发生其他任何安全问题，应立即修改帐号密码并妥善保管，如有必要，请通知本站。因黑客行为或用户的保管疏忽导致帐号非法使用，本站不承担任何责任。' +
                '由用户自行承担全部责任，本站不承担任何责任。如用户发现帐号遭到未授权的使用或发生其他任何安全问题，应立即修改帐号密码并妥善保管，如有必要，请通知本站。因黑客行为或用户的保管疏忽导致帐号非法使用，本站不承担任何责任。由用户自行承担全部责任，本站不承担任何责任。如用户发现帐号遭到未授权的使用或发生其他任何安全问题，应立即修改帐号密码并妥善保管，如有必要，请通知本站。因黑客行为或用户的保管疏忽导致帐号非法使用，本站不承担任何责任。由用户自行承担全部责任，本站不承担任何责任。如用户发现帐号遭到未授权的使用或发生其他任何安全问题，应立即修改帐号密码并妥善保管，如有必要，请通知本站。因黑客行为或用户的保管疏忽导致帐号非法使用，本站不承担任何责任。由用户自行承担全部责任，本站不承担任何责任。如用户发现帐号遭到未授权的使用或发生其他任何安全问题，应立即修改帐号密码并妥善保管，如有必要，请通知本站。因黑客行为或用户的保管疏忽导致帐号非法使用，本站不承担任何责任。由用户自行承担全部责任，本站不承担任何责任。如用户发现帐号遭到未授权的使用或发生其他任何安全问题，应立即修改帐号密码并妥善保管，如有必要，请通知本站。因黑客行为或用户的保管疏忽导致帐号非法使用，本站不承担任何责任。由用户自行承担全部责任，本站不承担任何责任。如用户发现帐号遭到未授权的使用或发生其他任何安全问题，应立即修改帐号密码并妥善保管，如有必要，请通知本站。因黑客行为或用户的保管疏忽导致帐号非法使用，本站不承担任何责任。由用户自行承担全部责任，本站不承担任何责任。如用户发现帐号遭到未授权的使用或发生其他任何安全问题，应立即修改帐号密码并妥善保管，如有必要，请通知本站。因黑客行为或用户的保管疏忽导致帐号非法使用，本站不承担任何责任。由用户自行承担全部责任，本站不承担任何责任。如用户发现帐号遭到未授权的使用或发生其他任何安全问题，应立即修改帐号密码并妥善保管，如有必要，请通知本站。因黑客行为或用户的保管疏忽导致帐号非法使用，本站不承担任何责任。' +
                '</div>'
                ,success: function(layero){

                }
            });
        }
        $scope.submitFun=function(){
            // $scope.first=false;
            // $scope.secend=true;
            $scope.formData={
                phone:$scope.phone,
                password:$scope.password,
                verificationCode:$scope.piccode,
                nickName:$scope.nikename,
                secretCode:$scope.secretCode
            }
            $http({
                method:"POST",
                url:'../front/register.do',
                data:$scope.formData,
                headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                transformRequest:function (obj) {
                    var str = [];
                    for (var s in obj) {
                        str.push(encodeURIComponent(s) + "=" + encodeURIComponent(obj[s]));
                    }
                    return str.join("&");
                }
            }).success(function(response){
                if(response.success==1){
                    ipCookie('error','');
                    $scope.first=false;
                    $scope.secend=false;
                    $scope.count2=5;
                        $scope.status2=$scope.count2+'s自动跳转到登录页';
                    var interval2=$interval(function(){
                        $scope.status2=($scope.count2-1)+'s自动跳转到登录页';
                        $scope.count2--;
                        if($scope.count2<0){
                            $scope.count2=5;
                            $scope.send=true;
                            $interval.cancel(interval2);
                            $state.go('login');
                        }
                    },1000)
                }
                else{
                    layer.alert(""+response.data.tipMessage,{icon:2});
                }
            })
        }
        $scope.changeimg=function(){
            angular.element('#imgcode').attr('src','../getImgCode.do?'+Math.random());
        }
    }])
    //策展列表页
    .controller('Album', ['$scope', '$rootScope', '$http', function ($scope, $rootScope, $http) {
        $rootScope.showIndex = true;
        $scope.tabpage = 0;
        $scope.changeTab = function (page) {
            $scope.tabpage = page;
        }
        $scope.laypage = function () {
            laypage({
                cont: $('.PagePlugs'),
                pages: 5, //可以叫服务端把总页数放在某一个隐藏域，再获取。假设我们获取到的是18
                curr: 1,
                skin: '#ea703a',
                groups: 4, //连续显示分页数
                jump: function (obj) { //触发分页后的回调
                    $scope.curr = obj.curr;
                    // $scope.conditions.currentPage=obj.curr;
                    // $scope.getDataList();
                    // console.log($scope.pages);
                }
            });
        }
        $scope.laypage();

    }])
    //策展详情页
    .controller('AlbumDetails', ['$scope', '$http', '$rootScope', '$stateParams', function ($scope, $http, $rootScope, $stateParams) {
        $rootScope.showIndex = true;
        $scope.loadingmore = true;
        $scope.num = 0;
        $scope.warr = false;
        $scope.msg = '';
        $scope.fullScreen = function () {
            var index = layer.open({
                title: '北宋陶瓷展',
                type: 2,
                content: './upload/3d-141113221250/index.html',
                area: ['320px', '195px']
            });
            layer.full(index);
        }
        $('.emotion').qqFace({
            id: 'facebox',
            assign: 'saytext',
            path: 'img/arclist/'//表情存放的路径
        });
        $scope.showComment = function () {
            $scope.saytext = $("#saytext").val();
            // $("#show").html(replace_em(str));
        }
        $scope.check = function () {
            $scope.len = ($scope.msg) ? $scope.msg.length : 0;
            (($scope.len + $scope.num) >= 1000) ?
                ($scope.warr = true) : ($scope.warr = false);
            console.log($scope.len);
        }
        $scope.loadMore = function () {
            $scope.loadingmore = false;
        }
    }])
    //首页
    .controller('index_parentControl', ['$scope', '$rootScope','$http', function ($scope, $rootScope,$http) {
        $rootScope.showIndex = true;
        $http({
            method:'GET',
            url:'../homePage/getHomePage.do',
            // url:'data/index.json'
        })
            .success(function(response){
                $scope.data=response.data;
            })
        $scope.slider = function () {
            $('.slider').unslider({
                autoplay: true,
                delay: 3000,
                arrows: {
                    prev: '<a class="unslider-arrow prev"></a>',
                    next: '<a class="unslider-arrow next"></a>',
                },
                animation: 'fade'
            });
        }
        $scope.swiper=function(){
            var mySwiper = new Swiper('.swiper-container', {
                // loop: true,
                nextButton: '.swiper-button-next',
                prevButton: '.swiper-button-prev',
                slidesPerView: 4,
                paginationClickable: true,
                // freeMode: true,
                observer: true,
                observeParents: true
            })
        }
        $scope.slides = [
            {ur: 'img/banner.png'},
            {ur: 'img/banner.png'},
            {ur: 'img/banner.png'},
            {ur: 'img/banner.png'},
            {ur: 'img/banner.png'},
            {ur: 'img/banner.png'},
            {ur: 'img/banner.png'},
            {ur: 'img/banner.png'},
            {ur: 'img/banner.png'}
        ];
        $scope.myInterval = 5000;
    }])
    //藏品主控制器
    .controller('Collection', ['$scope', '$stateParams', '$rootScope', function ($scope, $stateParams, $rootScope) {
        $rootScope.showIndex = true;
        $scope.tabisShow = true;
        $scope.id = 1;
        // $state.go('collection.relic',{id:$scope.id});
        $scope.isSelectedRelic = true;
        $scope.isSelectedSpecimen = false;
        $scope.tab = '文物藏品';
        $scope.showbtn = true;
        $scope.tabChange = function (e) {
            angular.element(e.target).addClass('active').siblings('button').removeClass('active')
            console.log(angular.element(e.target).html());
            if (angular.element(e.target).html() == '文物藏品') {
                $scope.isSelectedRelic = true;
                $scope.isSelectedSpecimen = false;
                $scope.tab = '文物藏品';
            } else {
                $scope.isSelectedRelic = false;
                $scope.isSelectedSpecimen = true;
                $scope.tab = '标本化石';
            }
        }
    }])
    //文物藏品列表页
    .controller('CollectionRelic', ['$scope', '$http', '$stateParams', '$rootScope', '$window', function ($scope, $http, $stateParams, $rootScope, $window) {
        $rootScope.showIndex = true;
        $scope.remove = true;
        //筛选条件
        $scope.isSelected = false;
        $scope.isClassify = false;
        $scope.isUnit = false;
        $scope.isActive = true;
        $scope.hasmore = false;
        $scope.isUnitshow = false;
        $scope.iPage = 1;
        $scope.selectedcondition = {year: '', unit: '', classify: '', sort: 1, keyword: '', iPage: 1};
        $scope.selected = {year: '', unit: '', classify: '', keyword: ''};
        $scope.arr = [];
        //点击收藏
        var addCollection = function (e,id,type) {
            // $scope.num3=3;
            // var interval=$interval(function(){
            //     $scope.num3-=1;
            //     $scope.canClick=false;
            //     console.log($scope.num3);
            //     console.log($scope.canClick);
            //     if($scope.num3<=0){
            //         $scope.canClick=true;
            //         $interval.cancel(interval);
            //     }
            // },3000)
            // if($scope.canClick){
            if(ipCookie('userinfor')){
                var a = angular.element(e.target).hasClass('active');
                if (!a) {
                    angular.element(e.target).addClass('active');
                    $http.get("../front/Collected/doCollect.do?collectionType="
                        + (type == 'Relic' ? 0 : 1) +
                        '&id=' +id)
                        .success(function (response) {
                            layer.msg('收藏成功');
                            // $scope.showMorecondition();
                        });
                } else {
                    angular.element(e.target).removeClass('active');
                    $http.get("../front/Collected/notCollect.do?collectionType="
                        + (type == 'Relic' ? 0 : 1) +
                        '&id=' + id)
                        .success(function (response) {
                            layer.msg('取消成功');
                            // $scope.showMorecondition();
                        });
                }
            }
            else{
                layer.msg('请先登录');
            }
        }
        //检测是否存在筛选条件
        $scope.checkCondition = function () {
            $scope.isSelected = ($scope.arr.length == 0) ? false : true;
        }
        if ($stateParams.museum) {
            $scope.remove = false;
            $scope.isUnit = false;
            $scope.isArea = true;
            $scope.selectedcondition.unit = $stateParams.id;
            $scope.selected.unit = $stateParams.museum;
            $scope.isUnitshow = true;
            $scope.isUnit = false;
            $scope.arr.push(1);
            $scope.iPage = 1;
            $('#ul1 li').html(" ");
            $scope.checkCondition();
        }
        var oUl = document.getElementById('ul1');
        var aLi = oUl.getElementsByTagName('li');
        var iLen = aLi.length;
        var b = true;
        //初始化数据处理
        getList();
        function getList() {
            if($scope.iPage <= 5){
                $http.get("../front/OCCollection/info.do?yearType="
                    // $http.get("data/collection_data1.json?yearType="
                    + $scope.selectedcondition.year +
                    '&collectionUnit=' + $scope.selectedcondition.unit +
                    '&collectionsCategory=' + $scope.selectedcondition.classify +
                    '&order=' + $scope.selectedcondition.sort +
                    '&key=' + $scope.selectedcondition.keyword +
                    '&currentPage=' + $scope.selectedcondition.iPage)
                    .success(function (response) {
                        var data = response.data.mociList;
                        $scope.hasMore=(response.page.allRow>($scope.selectedcondition.iPage*20));
                        // if ($scope.iPage > 6) {
                        //     //后续没有数据了
                        //     return;
                        // }
                        for (var i = 0; i < data.length; i++) {
                            //获取高度最短的li
                            var _index = getShort();
                            var oDiv = document.createElement('div');
                            var oImg = document.createElement('img');
                            var ou = document.createElement('u');
                            var oi = document.createElement('i');
                            $(oi).attr({
                                "data-ccid":data[i].mipOpenCulturalrelicInfo.id
                            })
                            oi.onclick=function(){
                                var id=$(this).attr('data-ccid');
                                var that=this;
                                var a=$(this).hasClass('active');
                                if(!a){
                                    $.ajax({
                                        type:'GET',
                                        url:"../front/Collected/doCollect.do?collectionType=0&id="+id,
                                        dataType:"text",
                                        success:function(json){
                                            var datas=eval("("+json+")");
                                            $(that).addClass('active')
                                            console.log(this);
                                            layer.msg('收藏成功');
                                        }
                                    })
                                }
                                else{
                                    $.ajax({
                                        type:'GET',
                                        url:"../front/Collected/notCollect.do?collectionType=0&id="+id,
                                        dataType:"text",
                                        success:function(json){
                                            var datas=eval("("+json+")");
                                            $(that).removeClass('active')
                                            console.log(this);
                                            layer.msg('取消成功');
                                        }
                                    })
                                }

                            };
                            (data[i].isCollected) ?
                                ($(oi).addClass('active')) : ($(oi).removeClass('active'));//判断有无收藏
                            (data[i].mipOpenCulturalrelicInfo.threeDimensionalCollection) ?
                                ($(ou).addClass("is3d")) : ($(ou).removeClass("is3d"))//判断是否3d

                            var ospan = document.createElement('span');
                            var oa = document.createElement('a');
                            $(oa).attr({
                                'href': "#/collectiondetails/Relic/" + data[i].mipOpenCulturalrelicInfo.id,
                                'target': "_blank"
                            });
                            oImg.src =data[i].picture.thumb2;
                            oImg.style.width = '278px';
                            oImg.style.height = data[i].picture.thumb2Height*(278/data[i].picture.thumb2Width) + 'px';
                            oa.appendChild(oImg);
                            var oP = document.createElement('p');
                            ospan.innerHTML = data[i].mipOpenCulturalrelicInfo.name;
                            oDiv.appendChild(oa);
                            oDiv.appendChild(oP);
                            oP.appendChild(ospan);
                            oDiv.appendChild(ou);
                            oDiv.appendChild(oi);
                            aLi[_index].appendChild(oDiv);
                        }
                        b = true;
                    });

            }else{
                return
            }
        }
        $window.onscroll = function () {

            var _index = getShort();
            var oLi = aLi[_index];

            var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;

            if (getTop(oLi) + oLi.offsetHeight < document.documentElement.clientHeight + scrollTop) {

                if (b) {
                    b = false;
                    $scope.iPage++;
                    $scope.selectedcondition.iPage = $scope.iPage;
                    if($scope.hasMore){
                        getList();
                    }
                }

            }

        }
        function getShort() {
            var index = 0;
            var ih = aLi[index].offsetHeight;
            for (var i = 1; i < iLen; i++) {
                if (aLi[i].offsetHeight < ih) {
                    index = i;
                    ih = aLi[i].offsetHeight;
                }
            }
            return index;
        }

        function getTop(obj) {
            var iTop = 0;
            while (obj) {
                iTop += obj.offsetTop;
                obj = obj.offsetParent;
            }
            return iTop;
        }

        //选择条件除了地区和收藏单位数据
        $scope.getDataList = function () {
            $http.get("../front/OCCollection/info.do?yearType="
            // $http.get("data/collection_data1.json?yearType="
                + $scope.selectedcondition.year +
                '&collectionUnit=' + $scope.selectedcondition.unit +
                '&collectionsCategory=' + $scope.selectedcondition.classify +
                '&order=' + $scope.selectedcondition.sort +
                '&key=' + $scope.selectedcondition.keyword +
                '&currentPage=' + $scope.selectedcondition.iPage)
                .success(function (response) {
                    $scope.data = response.data;
                    // $scope.showMorecondition();
                });
        }
        $scope.getDataList();

        //显示筛选条件
        $scope.getConditions = function (condition, val, e) {
            $scope[condition] = !$scope[condition];
            $scope.selectedcondition[val] = angular.element(e.target).attr('data-id');
            console.log(angular.element(e.target).attr('data-id'));
            $scope.selected[val] = angular.element(e.target).html();
            $scope.selectedcondition.iPage = 1;
            // }
            $scope.arr.push(1);
            $scope.iPage = 1;
            $('#ul1 li').html(" ");
            getList();
            $scope.checkCondition();
        }
        //隐藏筛选条件
        $scope.removeCondition = function (iscondition, val) {
            $scope[iscondition] = !$scope[iscondition];
            $scope.selectedcondition[val] = '';
            $scope.selected[val] = '';
            $scope.selectedcondition.iPage = 1;
            $scope.arr.pop();
            $scope.iPage = 1;
            $('#ul1 li').html(" ");
            getList();
            $scope.checkCondition();
        }
        //显示关键字
        $scope.showKeyword = function (condition, val, e) {
            $scope.value = $("#collection-search").val();
            if ($scope.value && $scope.value != $scope.selectedcondition.keyword) {
                console.log($scope.arr);
                if ($scope.isKey) {
                    $scope[condition] = true;
                    $scope.selectedcondition.keyword = $scope.value;
                    $scope.selected.keyword = $scope.value;
                    $scope.selectedcondition.iPage = 1;
                    $scope.iPage = 1;
                    $('#ul1 li').html(" ");
                    getList();
                    $scope.checkCondition();
                } else {
                    $scope[condition] = true;
                    $scope.selectedcondition.keyword = $scope.value;
                    $scope.selected.keyword = $scope.value;
                    $scope.selectedcondition.iPage = 1;
                    $scope.iPage = 1;
                    $scope.arr.push(1);
                    $('#ul1 li').html(" ");
                    getList();
                    $scope.checkCondition();
                }

            } else {
                return;
            }
        }
        //隐藏关键字
        $scope.hideKeyword = function (iscondition, val) {
            $scope[iscondition] = !$scope[iscondition];
            $scope.selectedcondition.keyword = '';
            $scope.selected.keyword = '';
            $scope.selectedcondition.iPage = 1;
            $scope.arr.pop();
            $scope.iPage = 1;
            $('#ul1 li').html(" ");
            getList();
            $scope.checkCondition();

        }
        //地区和收藏单位
        //获取地区
        $scope.getArea = function (e) {
            $scope.id = angular.element(e.target).attr('data-id');
            if ($scope.isUnitshow == true) {
                $scope.arr.pop();
            }
            $scope.isUnit = true;
            $scope.isUnitshow = false;
            $scope.checkCondition();
        }
        //获取收藏单位
        $scope.getUnit = function (e) {
            $scope.selectedcondition.unit = angular.element(e.target).attr('data-id2');
            $scope.selected.unit = angular.element(e.target).html();
            $scope.isUnitshow = true;
            $scope.isUnit = false;
            $scope.arr.push(1);
            $scope.iPage = 1;
            $('#ul1 li').html(" ");
            getList();
            $scope.checkCondition();
        }
        //移除收藏单位
        $scope.removeUnit = function () {
            $scope.selectedcondition.unit = '';
            $scope.selected.unit = '';
            $scope.isUnit = false;
            $scope.isUnitshow = false;
            $scope.arr.pop();
            $scope.iPage = 1;
            $('#ul1 li').html(" ");
            getList();
            $scope.checkCondition();
        }
        //点击更多
        $scope.SlideDown = function (e) {
            angular.element(e.target).prev().toggleClass("slidedown");
            var height = angular.element(e.target).prev().css("height");
            angular.element(e.target).prev().prev().css("height", height);
        }
        //切换最新和最热
        $scope.changeBtn = function (e) {
            $scope.isActive = !$scope.isActive;
            $scope.selectedcondition.iPage = 1;
            $scope.selectedcondition.sort = angular.element(e.target).attr('data-status');
            $scope.selected.sort = angular.element(e.target).html();
            ;
            $('#ul1 li').html(" ");
            $scope.iPage = 1;
            getList();
        }

    }])
    //文物标本列表
    .controller('CollectionSpecimen', ['$scope', '$http', '$stateParams', '$rootScope', '$window', function ($scope, $http, $stateParams, $rootScope, $window) {
        $rootScope.showIndex = true;
        $scope.remove = true;
        //筛选条件
        $scope.isSelected = false;
        $scope.isClassify = false;
        $scope.isUnit = false;
        $scope.isActive = true;
        $scope.hasmore = false;
        $scope.isUnitshow = false;
        $scope.iPage = 1;
        $scope.selectedcondition = {year: '', unit: '', classify: '', sort: 1, keyword: '', iPage: 1};
        $scope.selected = {year: '', unit: '', classify: '', sort: '最新', keyword: '', iPage: 1};
        $scope.arr = [];
        //检测是否存在筛选条件
        $scope.checkCondition = function () {
            $scope.isSelected = ($scope.arr.length == 0) ? false : true;
        }
        if ($stateParams.museum) {
            $scope.remove = false;
            $scope.isUnit = false;
            $scope.isArea = true;
            $scope.selectedcondition.unit = $stateParams.id;
            $scope.selected.unit = $stateParams.museum;
            $scope.isUnitshow = true;
            $scope.isUnit = false;
            $scope.arr.push(1);
            $scope.iPage = 1;
            $('#ul2 li').html(" ");
            $scope.checkCondition();

        }
        var oUl = document.getElementById('ul2');
        var aLi = oUl.getElementsByTagName('li');
        var iLen = aLi.length;
        var b = true;

        //初始化数据处理
        getList();
        function getList() {
            if($scope.iPage<=5){
                $http.get("../front/OCFossil/info.do?yearType="
                    // $http.get("data/collection_data2.json?yearType="
                    + $scope.selectedcondition.year +
                    '&collectionUnit=' + $scope.selectedcondition.unit +
                    '&collectionsCategory=' + $scope.selectedcondition.classify +
                    '&order=' + $scope.selectedcondition.sort +
                    '&key=' + $scope.selectedcondition.keyword +
                    '&currentPage=' + $scope.selectedcondition.iPage)
                    .success(function (response) {
                        var data = response.data.mociList;
                        $scope.hasMore=(response.page.allRow>($scope.selectedcondition.iPage*20));
                        console.log(data);
                        // if ($scope.iPage > 6) {
                        //     //后续没有数据了
                        //     return;
                        // }
                        for (var i = 0; i < data.length; i++) {
                            //获取高度最短的li
                            var _index = getShort();
                            var oDiv = document.createElement('div');
                            var oImg = document.createElement('img');
                            var ou = document.createElement('u');
                            var oi = document.createElement('i');
                            (data[i].isCollected) ?
                                ($(oi).addClass('active')) : ($(oi).removeClass('active'));
                            (data[i].mipOpenFossilInfo.threeDimensionalCollection) ?
                                ($(ou).addClass("is3d")) : ($(ou).removeClass("is3d"))
                            var ospan = document.createElement('span');
                            var oa = document.createElement('a');
                            $(oa).attr({
                                'href': "#/collectiondetails/Specimen/" + data[i].mipOpenFossilInfo.id,
                                'target': "_blank"
                            });
                            oImg.src = data[i].picture.thumb2;
                            oImg.style.width = '278px';
                            oImg.style.height = data[i].picture.thumb2Height*(278/data[i].picture.thumb2Width) + 'px';
                            oa.appendChild(oImg);
                            var oP = document.createElement('p');
                            ospan.innerHTML = data[i].mipOpenFossilInfo.name;
                            oDiv.appendChild(oa);
                            oDiv.appendChild(oP);
                            oP.appendChild(ospan);
                            oDiv.appendChild(ou);
                            oDiv.appendChild(oi);
                            aLi[_index].appendChild(oDiv);
                        }
                        b = true;
                    });

            }else {
                return
            }

        }

        $window.onscroll = function () {

            var _index = getShort();
            var oLi = aLi[_index];

            var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;

            if (getTop(oLi) + oLi.offsetHeight < document.documentElement.clientHeight + scrollTop) {

                if (b) {
                    b = false;
                    $scope.iPage++;
                    $scope.selectedcondition.iPage = $scope.iPage;
                    if($scope.hasMore){
                        getList();
                    }
                }

            }

        }

        function getShort() {
            var index = 0;
            var ih = aLi[index].offsetHeight;
            for (var i = 1; i < iLen; i++) {
                if (aLi[i].offsetHeight < ih) {
                    index = i;
                    ih = aLi[i].offsetHeight;
                }
            }
            return index;
        }

        function getTop(obj) {
            var iTop = 0;
            while (obj) {
                iTop += obj.offsetTop;
                obj = obj.offsetParent;
            }
            return iTop;
        }

        //选择条件除了地区和收藏单位数据
        $scope.getDataList = function () {
            $http.get("../front/OCFossil/info.do?yearType="
            // $http.get("data/collection_data2.json?yearType="
                + $scope.selectedcondition.year +
                '&collectionUnit=' + $scope.selectedcondition.unit +
                '&collectionsCategory=' + $scope.selectedcondition.classify +
                '&order=' + $scope.selectedcondition.sort +
                '&key=' + $scope.selectedcondition.keyword +
                '&currentPage=' + $scope.selectedcondition.iPage)
                .success(function (response) {
                    $scope.data = response.data;
                    // $scope.showMorecondition();
                });
        }
        $scope.getDataList();

        //显示筛选条件
        $scope.getConditions = function (condition, val, e) {
            $scope[condition] = !$scope[condition];
            $scope.selectedcondition[val] = angular.element(e.target).attr('data-id');
            $scope.selected[val] = angular.element(e.target).html();
            $scope.selectedcondition.iPage = 1;
            // }
            $scope.arr.push(1);
            $scope.iPage = 1;
            $('#ul2 li').html(" ");
            getList();
            $scope.checkCondition();
        }
        //隐藏筛选条件
        $scope.removeCondition = function (iscondition, val) {
            $scope[iscondition] = !$scope[iscondition];
            $scope.selectedcondition[val] = '';
            $scope.selected[val] = '';
            $scope.selectedcondition.iPage = 1;
            $scope.arr.pop();
            $scope.iPage = 1;
            $('#ul2 li').html(" ");
            getList();
            $scope.checkCondition();
        }
        //显示关键字
        $scope.showKeywords = function (condition, val, e) {
            $scope.value = $("#collection-search1").val();
            console.log($scope.value);
            if ($scope.value && $scope.value != $scope.selectedcondition.keyword) {
                if ($scope.isKey) {
                    $scope[condition] = true;
                    $scope.selectedcondition.keyword = $scope.value;
                    $scope.selected.keyword=$scope.value;
                    $scope.selectedcondition.iPage = 1;
                    $scope.iPage = 1;
                    $('#ul2 li').html(" ");
                    getList();
                    $scope.checkCondition();
                } else {
                    $scope[condition] = true;
                    $scope.selectedcondition.keyword = $scope.value;
                    $scope.selected.keyword = $scope.value;
                    $scope.selectedcondition.iPage = 1;
                    $scope.iPage = 1;
                    $scope.arr.push(1);
                    $('#ul2 li').html(" ");
                    getList();
                    $scope.checkCondition();
                }

            } else {
                return;
            }
        }
        //隐藏关键字
        $scope.hideKeyword = function (iscondition, val) {
            $scope[iscondition] = !$scope[iscondition];
            $scope.selectedcondition.keyword = '';
            $scope.selectedcondition.iPage = 1;
            $scope.arr.pop();
            $scope.iPage = 1;
            $('#ul1 li').html(" ");
            getList();
            $scope.checkCondition();

        }
        //地区和收藏单位
        //获取地区
        $scope.getArea = function (e) {
            $scope.id = angular.element(e.target).attr('data-id');
            // $scope.selectedcondition.area=angular.element(e.target).html();
            // $scope.isArea=true;
            if ($scope.isUnitshow == true) {
                $scope.arr.pop();
            }
            $scope.isUnit = true;
            $scope.isUnitshow = false;
            $scope.checkCondition();
            // $scope.getDataList();
        }
        //获取收藏单位
        $scope.getUnit = function (e) {
            $scope.selectedcondition.unit = angular.element(e.target).attr('data-id2');
            $scope.selected.unit = angular.element(e.target).html();
            $scope.isUnitshow = true;
            $scope.isUnit = false;
            $scope.arr.push(1);
            $scope.iPage = 1;
            $('#ul2 li').html(" ");
            getList();
            $scope.checkCondition();
        }
        //移除收藏单位
        $scope.removeUnit = function () {
            $scope.selectedcondition.unit = '';
            $scope.isUnit = false;
            $scope.isUnitshow = false;
            $scope.arr.pop();
            $scope.iPage = 1;
            $('#ul2 li').html(" ");
            getList();
            $scope.checkCondition();
        }
        //点击更多
        $scope.SlideDown = function (e) {
            angular.element(e.target).prev().toggleClass("slidedown");
            var height = angular.element(e.target).prev().css("height");
            angular.element(e.target).prev().prev().css("height", height);
        }
        //切换最新和最热
        $scope.changeBtn = function (e) {
            $scope.isActive = !$scope.isActive;
            $scope.selectedcondition.iPage = 1;
            $scope.selectedcondition.sort = angular.element(e.target).attr('data-status');
            $scope.selected.sort = angular.element(e.target).html();
            ;
            $('#ul2 li').html(" ");
            $scope.iPage = 1;
            getList();
        }

    }])
    //藏品详情页
    .controller('CollectionDetails', ['$scope', '$http', '$stateParams', '$window', '$rootScope', '$state', 'ipCookie','$sce','$interval',function ($scope, $http, $stateParams, $window, $rootScope, $state,ipCookie,$sce,$interval) {
        $rootScope.showIndex = true;
        $scope.$parent.showbtn = false;
        $scope.num = 0;
        $scope.num1 = 0;
        $scope.hasmoreleft = false;
        $scope.hasmoreright = true;
        $scope.hasmoreleft1 = false;
        $scope.hasmoreright1 = true;
        $scope.num2 = 0;
        $scope.pplay=false;
        $scope.sce=$sce.trustAsResourceUrl;
        $scope.open3D=function(url){
            $window.open(url);
        };
        $scope
        $scope.playAudio=function(){
            $scope.pplay=!$scope.pplay;
            if($scope.pplay){
                document.getElementById('paudio').play();
            }else{
                document.getElementById('paudio').pause();
            }
        };
        $scope.canClick=true;
        $scope.addCollection = function (e) {
            // $scope.num3=3;
            // var interval=$interval(function(){
            //     $scope.num3-=1;
            //     $scope.canClick=false;
            //     console.log($scope.num3);
            //     console.log($scope.canClick);
            //     if($scope.num3<=0){
            //         $scope.canClick=true;
            //         $interval.cancel(interval);
            //     }
            // },3000)
            // if($scope.canClick){
                if(ipCookie('userinfor')){
                    var a = angular.element(e.target).hasClass('active');
                    if (!a) {
                        $scope.num2 += 1;
                        angular.element(e.target).addClass('active');
                        $http.get("../front/Collected/doCollect.do?collectionType="
                            + ($stateParams.type == 'Relic' ? 0 : 1) +
                            '&id=' + $stateParams.id)
                            .success(function (response) {
                                layer.msg('收藏成功');
                                // $scope.showMorecondition();
                            });
                    } else {
                        $scope.num2 -= 1;
                        angular.element(e.target).removeClass('active');
                        $http.get("../front/Collected/notCollect.do?collectionType="
                            + ($stateParams.type == 'Relic' ? 0 : 1) +
                            '&id=' + $stateParams.id)
                            .success(function (response) {
                                layer.msg('取消成功');
                                // $scope.showMorecondition();
                            });
                    }
                }
                else{
                    layer.msg('请先登录');
                }
            // }
            // else{
            //     console.log($scope.num3);
            //     console.log($scope.canClick);
            //     layer.msg('您的操作太频繁！');
            //     return;
            // }
        }
        $scope.getDetail = function () {
            $stateParams.type == 'Relic' ? $scope.url= "../front/OCCollection/detail.do?id=":$scope.url='../front/OCFossil/detail.do?id='
                console.log($scope.url);
                $http.get($scope.url
            // $http.get("data/collection_details.json?id="
                + $stateParams.id)
                .success(function (response) {
                    $scope.data = response.data.mocid||response.data.mofid;
                    $scope.correlation = response.data.relations
                        .slice(0, 5);
                    $scope.corother = response.data.otherMofiList.slice(0, 5);
                    ;
                    $scope.addPage = function (title) {
                        if (title === 'relations') {
                            if ($scope.num == 5) {
                                $scope.hasmoreleft = true;
                                $scope.hasmoreright = false;
                            }
                            if ($scope.num < 10) {
                                $scope.num += 5;
                                $scope.correlation = response.data[title]
                                    .slice($scope.num, $scope.num + 5);
                                return
                            }
                        } else {
                            if ($scope.num1 == 5) {
                                $scope.hasmoreleft1 = true;
                                $scope.hasmoreright1 = false;
                            }
                            if ($scope.num1 < 10) {
                                $scope.num1 += 5;
                                $scope.corother = response.data.otherMofiList
                                    .slice($scope.num1, $scope.num1 + 5);
                                return
                            }
                        }
                    }
                    $scope.reducePage = function (title) {
                        if (title === 'relations') {
                            if ($scope.num == 5) {
                                $scope.hasmoreleft = false;
                                $scope.hasmoreright = true;
                            }
                            if ($scope.num > 0) {
                                $scope.num -= 5;
                                $scope.correlation = response.data[title]
                                    .slice($scope.num, $scope.num + 5);
                            }
                            else {
                                return;
                            }
                        } else {
                            if ($scope.num1 == 5) {
                                $scope.hasmoreleft1 = false;
                                $scope.hasmoreright1 = true;
                            }
                            if ($scope.num1 > 0) {
                                $scope.num1 -= 5;
                                $scope.corother = response.data.otherMofiList
                                    .slice($scope.num1, $scope.num1 + 5);
                            }
                            else {
                                return;
                            }
                        }

                    }
                    $scope.videoid=$stateParams.id;
                    $scope.videotype=$stateParams.type;
                });
        }

        $scope.getDetail();
    }])
    //藏品视频
    .controller('CollectionDetailsVideo', ['$scope', '$http', '$stateParams', '$window', '$rootScope', '$sce',function ($scope, $http, $stateParams, $window, $rootScope,$sce) {
        $rootScope.showIndex = false;
        $scope.id=$stateParams.id;
        $scope.video = function () {
            $stateParams.type == 'Relic' ? $scope.url= "../front/OCCollection/detail.do?id=":$scope.url='../front/OCFossil/detail.do?id='
            $http.get($scope.url
                // $http.get("data/collection_details.json?id="
                + $stateParams.id)
                .success(function (response) {
                    $scope.sce=$sce.trustAsResourceUrl;
                    $scope.data = response.data.mocid||response.data.mofid;
                    var myPlayer = videojs('my-player');
                    videojs("my-player").ready(function () {
                        $('#my-player').css('width', $(document).width());
                        $('#my-player').css('height', $(document).height());
                    });

                });
        }
        $scope.video();
    }])
    //展览列表父控制器
    .controller('Displaylist', ['$scope', '$rootScope', '$stateParams', function ($scope, $rootScope, $stateParams) {
        $rootScope.showIndex = true;
        $scope.tabpage = 1;
        $scope.tabChange = function (tabpage) {
            $scope.tabpage = tabpage;
        }
    }])
    //省内展览
    .controller('Displaylist.Pinner', ['$scope', '$http', '$rootScope', '$stateParams', function ($scope, $http, $rootScope, $stateParams) {
        $rootScope.showIndex = true;
        $scope.remove = true;
        $scope.curr = 1;
        // $scope.pages = 5;
        $scope.tabsubpage = 1;
        $scope.keyword = '';
        $scope.area = '';
        $scope.isA = false;
        $scope.isK = false;
        $scope.conditions = {
            currentPage: $scope.curr,
            spreType: $scope.tabsubpage,
            cityId: $scope.area,
            keys: $scope.keyword
        }
        $scope.arr = [];
        $scope.isClassify = true;
        $scope.isArea = false;
        $scope.isSelected = false;
        $scope.isunit = false;
        $scope.getConditions = function () {
            $http({
                method: 'GET',
                url: '../spreadtrum/getPCSpreadtrum.do',
                params: $scope.conditions
            })
                .success(function (response) {
                    $scope.conditionData = response.data.cityList;
                })
        }
        $scope.getDataList = function () {
            $http({
                method: 'GET',
                url: '../spreadtrum/getPCSpreadtrum.do',
                params: $scope.conditions
            })
                .success(function (response) {
                    if (response.data.newSpreList) {
                        $scope.nDatalist = response.data.newSpreList;
                    } else {
                        $scope.nDatalist = response.data.pastSpreList;
                    }
                    response.page.totalPage = $scope.pages;
                })
        }
        // $scope.getDataList()
        //点击更多
        $scope.SlideDown = function (e) {
            angular.element(e.target).prev().toggleClass("slidedown");
            var height = angular.element(e.target).prev().css("height");
            angular.element(e.target).prev().prev().css("height", height);
        }
        $scope.getConditions();
        //切换正在展览和往期回顾
        $scope.changeListTab = function (tabpage) {
            console.log(tabpage);
            $scope.conditions.currentPage = 1;
            $scope.tabsubpage = tabpage;
            $scope.conditions.spreType = tabpage;
            $scope.laypage();
        }
        //检测是否存在筛选条件
        $scope.checkCondition = function () {
            $scope.isSelected = ($scope.arr.length == 0) ? false : true;
        }
        //显示筛选条件
        $scope.getClassify = function (e) {
            $scope.index = angular.element(e.target).attr('data-index');
            $scope.isArea = true;
            console.log($scope.conditionData)
        }
        $scope.getArea = function (e) {
            $scope.arr.push(1);
            $scope.area = angular.element(e.target).html();

            $scope.isArea = false;
            $scope.isA = true;
            $scope.isClassify = false;
            $scope.conditions.currentPage = 1;
            $scope.conditions.cityId = angular.element(e.target).attr('data-id');
            $scope.checkCondition();
            $scope.laypage();
        }
        $scope.removeArea = function () {
            $scope.arr.pop();
            $scope.conditions.cityId = '';
            $scope.isArea = false;
            $scope.isClassify = true;
            $scope.isA = false;
            $scope.conditions.currentPage = 1;
            $scope.checkCondition();
            $scope.laypage();
        }
        //显示关键字
        $scope.showKeyword = function () {
            $scope.value = $('#search_box').val().trim();
            console.log($scope.value);
            if ($scope.value && $scope.value != $scope.conditions.keys) {
                console.log($scope.arr);
                if ($scope.isK) {
                    $scope.conditions.keys = $scope.value;
                    $scope.conditions.currentPage = 1;
                    $scope.laypage();
                    $scope.checkCondition();
                } else {
                    $scope.isK = true;
                    $scope.conditions.keys = $scope.value;
                    $scope.conditions.currentPage = 1;
                    $scope.laypage();
                    $scope.arr.push(1);
                    $scope.checkCondition();
                }

            } else {
                return;
            }
        }
        //隐藏关键字
        $scope.hideKeyword = function () {
            $scope.isK = false;
            $scope.conditions.keys = '';
            $scope.conditions.currentPage = 1;
            $scope.arr.pop();
            $scope.laypage();
            $scope.checkCondition();
        }
        $scope.laypage = function () {
            $http({
                method: 'GET',
                url: '../spreadtrum/getPCSpreadtrum.do',
                params: $scope.conditions
            })
                .success(function (response) {
                    $scope.pages=response.page.totalPage;
                    laypage({
                        cont: $('.PagePlugs'),
                        pages: $scope.pages, //可以叫服务端把总页数放在某一个隐藏域，再获取。假设我们获取到的是18
                        curr: 1,
                        skin: '#ea703a',
                        groups: 5, //连续显示分页数
                        jump: function (obj) { //触发分页后的回调
                            $scope.conditions.currentPage = obj.curr;
                            $scope.getDataList();
                        }
                    });
                })
        }
        $scope.laypage();
        if ($stateParams.museum) {
            $scope.remove = false;
            $scope.arr.push(1);
            $scope.area = $stateParams.museum;
            $scope.isArea = false;
            $scope.isA = true;
            $scope.isClassify = false;
            $scope.conditions.currentPage = 1;
            $scope.conditions.musExhibition = $stateParams.id;
            $scope.checkCondition();
            $scope.laypage();
        }
    }])
    //省外展览
    .controller('Displaylist.Pouter', ['$scope', '$http', '$rootScope', '$stateParams', function ($scope, $http, $rootScope, $stateParams) {
        $rootScope.showIndex = true;
        $scope.curr = 1;
        // $scope.pages = 5;
        $scope.conditions = {
            currentPage: $scope.curr,
            type: 1
        }
        $scope.getDataList = function () {
            $http({
                method: 'GET',
                // url: 'data/display.json',
                url: '../otherSpreadtrum/getReceptionSpreadtrum.do',
                params: $scope.conditions
            })
                .success(function (response) {
                    $scope.nDatalist = response.data;
                    response.page.totalPage = $scope.pages;
                })
        }
        $scope.laypage = function () {
            $http({
                method: 'GET',
                // url: 'data/display.json',
                url: '../otherSpreadtrum/getReceptionSpreadtrum.do',
                params: $scope.conditions
            })
                .success(function (response) {
                    console.log(123);
                    $scope.nDatalist = response.data;
                    $scope.pages=response.page.totalPage;
                    laypage({
                        cont: $('.PagePlugs'),
                        pages: $scope.pages, //可以叫服务端把总页数放在某一个隐藏域，再获取。假设我们获取到的是18
                        curr: 1,
                        skin: '#ea703a',
                        groups: 5, //连续显示分页数
                        jump: function (obj) { //触发分页后的回调
                            // $scope.curr = obj.curr;
                            $scope.conditions.currentPage = obj.curr;
                            $scope.getDataList();
                        }
                    });
                })

        }
        $scope.laypage();
    }])
    //国外展览
    .controller('Displaylist.Outer', ['$scope', '$http', '$rootScope', '$stateParams', function ($scope, $http, $rootScope, $stateParams) {
        $rootScope.showIndex = true;
        $scope.curr = 1;
        // $scope.pages = 5;
        $scope.conditions = {
            currentPage: $scope.curr,
            type: 2
        }
        $scope.getDataList = function () {
            $http({
                method: 'GET',
                // url: 'data/display.json',
                url: '../otherSpreadtrum/getReceptionSpreadtrum.do',
                params: $scope.conditions
            })
                .success(function (response) {
                    $scope.nDatalist = response.data;
                    response.page.totalPage = $scope.pages;
                })
        }
        $scope.laypage = function () {
            $http({
                method: 'GET',
                // url: 'data/display.json',
                url: '../otherSpreadtrum/getReceptionSpreadtrum.do',
                params: $scope.conditions
            })
                .success(function (response) {
                    console.log(123);
                    $scope.nDatalist = response.data;
                    $scope.pages=response.page.totalPage;
                    laypage({
                        cont: $('.PagePlugs'),
                        pages: $scope.pages, //可以叫服务端把总页数放在某一个隐藏域，再获取。假设我们获取到的是18
                        curr: 1,
                        skin: '#ea703a',
                        groups: 5, //连续显示分页数
                        jump: function (obj) { //触发分页后的回调
                            // $scope.curr = obj.curr;
                            $scope.conditions.currentPage = obj.curr;
                            $scope.getDataList();
                        }
                    });
                })

        }
        $scope.laypage();
    }])
    //展览详情页
    .controller('Display.Details', ['$scope', '$http', '$stateParams', '$rootScope', function ($scope, $http, $stateParams, $rootScope) {
        $rootScope.showIndex = true;
        $scope.curr = 1;
        $scope.pages = 5;
        if ($stateParams.type == 'inner') {
            $scope.url='../spreadtrum/getOneSpreadtrum.do'
        }else{
            $scope.url='../otherSpreadtrum/getOneData.do'
        }
        $http({
            method: 'GET',
            // url: 'data/display-details.json',
            url: $scope.url,
            params: {id: $stateParams.id}
        })
            .success(function (response) {
                $scope.detailsData = response.data;
            })
    }])
    //博物馆主控制器
    .controller('Museum', ['$scope', '$scope', '$rootScope', '$stateParams', function ($scope, $stateParams, $rootScope) {
        $rootScope.showIndex = true;
    }])
    //博物馆地图
    .controller('MuseumMap', ['$scope', '$http', '$rootScope', '$stateParams', '$window', function ($scope, $http, $rootScope, $stateParams, $window) {
        $rootScope.showIndex = true;
        $scope.cityid = {id: 1};
        $scope.colorRating = [
            '#771b1b',
            '#802f2f',
            '#6a3939',
            '#723f3f',
            '#834d4d',
            '#833e3e',
            '#8d4040',
            '#954848',
            '#9c5656',
            '#a56666',
            '#b37777',
            '#bc8b8b',
            '#cb9696',
            '#daa1a1',
            '#f0b3b3',
            '#ffc1c1',
            '#fee0e0'
        ];
        // $scope.colorRating=[
        //     '#133e60',
        //     '#0c4571',
        //     '#105185',
        //     '#015796',
        //     '#0277bd',
        //     '#0288d1',
        //     '#039be5',
        //     '#0091ea',
        //     '#03a9f4',
        //     '#00b0ff',
        //     '#29b6f6',
        //     '#40c4ff',
        //     '#4fc3f7',
        //     '#81d4fa',
        //     '#80d8ff',
        //     '#b3e5fc',
        //     '#e1f5fe'
        // ]
        $http({
            method: "GET",
            // url: 'data/data_map.json',
            url: '../area/getAreaList.do'
        }).success(function (response) {
            console.log(response);
            for (var i = 0, len = response.length; i < len; i++) {
                var index = response[i].cityOrder;
                $("#path" + (i + 1)).attr('fill', $scope.colorRating[index - 1])
            }
            $scope.cityData = response;
        })
        angular.element($("path")).hover(function () {
            $scope.color = $(this).attr("fill");
            $(this).css({
                cursor: 'pointer',
                fill: '#ea703a',
                transition: 'all .8s'
            })
        }, function () {
            $(this).css({
                    fill: $scope.color
                }
            )
        })
        $scope.changeCity = function (e) {
            $scope.cityid.id = angular.element(e.target)[0].id.slice(4)
        }
    }])
    //博物馆详情页
    .controller('MuseumDetails', ['$scope', '$rootScope','$http','$stateParams', function ($scope, $rootScope,$http,$stateParams) {
        console.log($stateParams.id);
        $http({
            method:"GET",
            url:'data/museumslider.json',
            // url:'data/museumDetails.json',
            params:{orgId:$stateParams.id}
        })
            .success(function(response){
                $scope.sliders=response;
                console.log($scope.sliders);
            })
        $scope.slider6 = function () {
            $('.museum-details-img').unslider({
                autoplay: true,
                delay: 3000,
                animation: 'fade',
                arrows:false
            });
        }
        $http({
            method:"GET",
            url:'../museuminfo/getMuseum.do',
            // url:'data/museumDetails.json',
            params:{orgId:$stateParams.id}
        })
            .success(function(response){
                $scope.data=response.data;
                $scope.id=$stateParams.id;
                console.log(response.data);
                var map=''+response.data.museumInfo.geography;
                var width=308;
                var height=314;
                var reg1=/(width=\"?\d*\"?)/g;
                var reg2=/(height=\"?\d*\"?)/g;
                var map1=map.replace(reg1,'width='+width);
                var map2=map1.replace(reg2,'height='+height);
                angular.element('#map').attr('src',map2);
            })
        $scope.changeTab = function (e) {
            angular.element(e.target).addClass("active").siblings().removeClass("active");
            var index = angular.element(e.target).index();
            angular.element(".museum-details-service-content li").eq(index).addClass("active").siblings().removeClass("active");
            angular.element(".museum-details-service-content li").eq(index).find("p").removeClass("auto-height");
            $scope.btn = "查看全部";
        }
        $scope.btn = "查看全部";
        $scope.lookAll = function (e) {
            angular.element(e.target).parent().prev().toggleClass("auto-height");

            $scope.btn = ($scope.btn === "查看全部") ? '收起' : "查看全部";
        }
    }])
    //数字展厅
    .controller('Digization', ['$scope', "$http", '$rootScope', '$stateParams', function ($scope, $http, $rootScope, $stateParams) {
        $rootScope.showIndex = true;
        $scope.showTab = true;
        $scope.showMore = function (e) {
            angular.element(e.target).addClass('showmore').removeClass('hide')
        }
        $scope.hide = function (e) {
            angular.element(e.target).removeClass('showmore').addClass('hide')
        };
        $scope.tabpage = 1;
        $scope.page = 1;
        $scope.museum = '';
        $scope.conditions = {
            currentPage: $scope.page,
            flag: $scope.tabpage,
            orgId: $scope.museum,
            size: '3'
        }
        $scope.changeTab = function (page) {
            $scope.tabpage = page;
            $scope.conditions.flag = page;
            $scope.laypage();
        }
        // // $http.get("../virtual/getPCVirtual.do?currentPage="+$scope.curr)
        // $http.get("data/v.json?currentPage=" + $scope.curr)
        //     .success(function (response) {
        //
        //     });
        $scope.laypage = function () {
            $http({
                method: "GET",
                url:'../virtual/getPCVirtual.do',
                // url: "data/v.json",
                params: $scope.conditions
            })
                .success(function (response) {
                    $scope.pages = response.page.totalPage;
                    $scope.data = response.data;
                    laypage({
                        cont: $('.PagePlugs'),
                        pages: $scope.pages, //可以叫服务端把总页数放在某一个隐藏域，再获取。假设我们获取到的是18
                        curr: 1,
                        skin: '#ea703a',
                        groups: 5, //连续显示分页数
                        jump: function (obj) { //触发分页后的回调
                            $scope.conditions.currentPage = obj.curr;
                            console.log($scope.pages);
                            $scope.getDataList();
                        }
                    });
                    $scope.addClick=function(id){
                        console.log(123);
                        $http({
                            method:'GET',
                            url:'../virtual/addOnclick.do',
                            params:{id:id}
                        })
                            .success(function(respsonse){

                            })
                    }
                });
        }
        $scope.laypage();
        $scope.getDataList = function () {
            $http({
                method: "GET",
                url:'../virtual/getPCVirtual.do',
                // url: "data/v.json",
                params: $scope.conditions
            })
                .success(function (response) {
                    $scope.data = response.data;
                });
        }
        if ($stateParams.museum) {
            $scope.showTab = false;
            $scope.conditions.orgId = $stateParams.id;
            $scope.museum = $stateParams.museum;
            $scope.getDataList();
        }

    }]);
