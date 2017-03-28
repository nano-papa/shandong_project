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
        $scope.gocollection=function(){
            $scope.keys=angular.element('#search').val();
            if($scope.keys){
                $state.go('collection',{keywords:$scope.keys})
            }
            else{
                layer.msg('请输入搜索关键字！');
                return
            }
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
                ,content:
                '<div style="font-size:12px;background:#fff;color:#333;padding:20px;overflow-y: scroll;line-height:1.5 ">'+
                    '<p>尊敬的客户，欢迎您注册成为本网站用户。在注册前请您仔细阅读如下服务条款：</p>'+
                '<p>本服务协议双方为本网站与本网站客户，本服务协议具有合同效力。您确认本服务协议后，本服务协议即在您和本网站之间产生法律效力。请您务必在注册之前认真阅读全部服务协议内容，如有任何疑问，可向本网站咨询。无论您事实上是否在注册之前认真阅读了本服务协议，只要您点击协议正本下方的"注册"按钮并按照本网站注册程序成功注册为用户，您的行为仍然表示您同意并签署了本服务协议。协议细则</p>'+
            '1、本网站服务条款的确认和接纳本网站各项服务的所有权和运作权归本网站拥有。'+

'2、用户必须：'+
'(1)自行配备上网的所需设备，包括个人电脑、调制解调器或其他必备上网装置。'+
'(2)自行负担个人上网所支付的与此服务有关的电话费用、网络费用。'+

'3、用户在本网站平台上不得发布下列违法信息：'+
'(1)反对宪法所确定的基本原则的；'+
'(2)危害国家安全，泄露国家秘密，颠覆国家政权，破坏国家统一的；'+
'(3)损害国家荣誉和利益的；'+
'(4)煽动民族仇恨、民族歧视，破坏民族团结的；'+
'(5)破坏国家宗教政策，宣扬邪教和封建迷信的；'+
'(6)散布谣言，扰乱社会秩序，破坏社会稳定的；'+
'(7)散布淫秽、色情、赌博、暴力、凶杀、恐怖或者教唆犯罪的；'+
'(8)侮辱或者诽谤他人，侵害他人合法权益的；'+
'(9)含有法律、行政法规禁止的其他内容的。'+

'4、有关个人资料用户同意：'+
'(1)提供及时、详尽及准确的个人资料。'+
'(2)同意接收来自本网站的信息。'+
'(3)不断更新注册资料，符合及时、详尽准确的要求。所有原始键入的资料将引用为注册资料。'+

'5、手机注册'+
            '用户在注册时应当选择常用手机号码，并且同意接受并阅读本网站发往用户的各类验证码短信。如用户未及查看短信或因用户接收及阅读程序本身的问题使验证码短信及其他相关信息无法正常接收或阅读的，只要本网站成功发送了相关信息，应当视为用户已经接收到内容。短信在发信服务器上所记录的发出时间视为送达时间。'+

'6、服务条款的修改'+
            '本网站有权在必要时修改服务条款，本网站服务条款一旦发生变动，将会在重要页面上提示修改内容。如果不同意所改动的内容，用户可以主动取消获得的本网站信息服务。如果用户继续享用本网站信息服务，则视为接受服务条款的变动。本网站保留随时修改或中断服务而不需通知用户的权利。本网站行使修改或中断服务的权利，不需对用户或第三方负责。'+

'7、用户的帐号、密码和安全性'+
            '用户一旦注册成功成为用户，将得到一个密码和帐号。如果用户不保管好自己的帐号和密码安全，将负全部责任。另外，每个用户都要对其帐户中的所有活动和事件负全责。可随时根据指示改变密码，也可以结束旧的帐户重开一个新帐户。用户同意若发现任何非法使用用户帐号或安全漏洞的情况，请立即通知本网站。'+

'8、拒绝提供担保'+
            '用户明确同意信息服务的使用由用户个人承担风险。本网站不担保服务不会受中断，对服务的及时性，安全性，出错发生都不作担保，但会在能力范围内，避免出错。'+

'9、有限责任'+
            '本网站对任何直接、间接、偶然、特殊及继起的损害不负责任，这些损害来自：不正当使用本网站服务，或用户传送的信息不符合规定等。这些行为都有可能导致本网站形象受损，所以本网站事先提出这种损害的可能性，同时会尽量避免这种损害的发生。'+

'10、信息的储存及限制'+
            '本网站有判定用户的行为是否符合本网站服务条款的要求和精神的权利，如果用户违背本网站服务条款的规定，本网站有权中断其服务的帐号。'+

'11、用户管理'+
            '用户必须遵循：'+
'(1)使用信息服务不作非法用途。'+
'(2)不干扰或混乱网络服务。'+
'(3)遵守所有使用服务的网络协议、规定、程序和惯例。用户的行为准则是以因特网法规，政策、程序和惯例为根据的。'+

'12、保障'+
            '用户同意保障和维护本网站全体成员的利益，负责支付由用户使用超出服务范围引起的律师费用，违反服务条款的损害补偿费用，其它人使用用户的电脑、帐号和其它知识产权的追索费。'+

'13、结束服务'+
            '用户或本网站可随时根据实际情况中断一项或多项服务。本网站不需对任何个人或第三方负责而随时中断服务。用户若反对任何服务条款的建议或对后来的条款修改有异议，或对本网站服务不满，用户可以行使如下权利：'+
'(1) 不再使用本网站信息服务。'+
'(2) 通知本网站停止对该用户的服务。'+

'结束用户服务后，用户使用本网站服务的权利马上中止。从那时起，用户没有权利，本网站也没有义务传送任何未处理的信息或未完成的服务给用户或第三方。'+

'14、通告'+
            '所有发给用户的通告都可通过重要页面的公告或电子邮件或常规的信件传送。服务条款的修改、服务变更、或其它重要事件的通告都会以此形式进行。'+

'15、信息内容的所有权'+
            '本网站定义的信息内容包括：文字、软件、声音、相片、录象、图表以及本网站为用户提供的其它信息。所有这些内容受版权、商标、标签和其它财产所有权法律的保护。所以，用户只能在本网站和广告商授权下才能使用这些内容，而不能擅自复制、再造这些内容、或创造与内容有关的派生产品。'+

'16、法律'+
            '本网站信息服务条款要与中华人民共和国的法律解释一致。用户和本网站一致同意服从本网站所在地有管辖权的法院管辖。'+
                '</div>',
                success: function(layero){

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
                // observer: true,
                // observeParents: true,
                spaceBetween: 60
            })
        };
        console.log($rootScope.imgUrlarr);

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
    .controller('CollectionRelic', ['$scope', '$http', '$stateParams', '$rootScope', '$window', 'Getcookie',function ($scope, $http, $stateParams, $rootScope, $window,Getcookie) {
        $rootScope.showIndex = true;
        $scope.showData=false;
        $scope.remove = true;
        $scope.removekey=true;
        //筛选条件
        $scope.isSelected = false;
        $scope.isClassify = false;
        $scope.isUnit = false;
        $scope.isActive = true;
        $scope.hasmore = false;
        $scope.isUnitshow = false;
        $scope.iPage = 1;
        $scope.selectedcondition = {year: '', unit: '', classify: '', sort: 2, keyword: '', iPage: 1};
        $scope.selected = {year: '', unit: '', classify: '', keyword: ''};
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
            $('#ul1 li').html(" ");
            $scope.checkCondition();
        }
        if($stateParams.keywords){
            $scope.remove = false;
            $scope.isUnit = false;
            $scope.isArea = false;
            $scope.removekey=false;
            $scope.selectedcondition.keyword = $stateParams.keywords;
            $scope.selected.keywords = $stateParams.keywords;
            $scope.isUnitshow = false;
            $scope.isUnit = false;
            $scope.isKey=true;
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
                        $scope.showData=(response.page.allRow<=0?true:false);
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
                            }).css({
                                cursor:'pointer'
                            })
                            oi.onclick=function(){
                                var id=$(this).attr('data-ccid');
                                var that=this;
                                var a=$(this).hasClass('active');
                                console.log(Getcookie('userinfor'));
                                if(Getcookie('userinfor')){
                                    if(!a){
                                        $.ajax({
                                            type:'GET',
                                            url:"../front/OCCollection/doCollect.do?collectionType=0&id="+id,
                                            dataType:"text",
                                            success:function(json){
                                                var datas=eval("("+json+")");
                                                $(that).addClass('active')
                                                layer.msg('收藏成功');
                                            }
                                        })
                                    }
                                    else{
                                        $.ajax({
                                            type:'GET',
                                            url:"../front/OCCollection/notCollect.do?collectionType=0&id="+id,
                                            dataType:"text",
                                            success:function(json){
                                                var datas=eval("("+json+")");
                                                $(that).removeClass('active')
                                                layer.msg('取消成功');
                                            }
                                        })
                                    }
                                }
                                else{
                                    layer.msg('请先登录');
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
    .controller('CollectionSpecimen', ['$scope', '$http', '$stateParams', '$rootScope', '$window','Getcookie', function ($scope, $http, $stateParams, $rootScope, $window,Getcookie) {
        $rootScope.showIndex = true;
        $scope.showData=false;
        $scope.remove = true;
        //筛选条件
        $scope.isSelected = false;
        $scope.isClassify = false;
        $scope.isUnit = false;
        $scope.isActive = true;
        $scope.hasmore = false;
        $scope.isUnitshow = false;
        $scope.iPage = 1;
        $scope.selectedcondition = {year: '', unit: '', classify: '', sort: 2, keyword: '', iPage: 1};
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
                        $scope.showData=(response.page.allRow<=0?true:false);
                        for (var i = 0; i < data.length; i++) {
                            //获取高度最短的li
                            var _index = getShort();
                            var oDiv = document.createElement('div');
                            var oImg = document.createElement('img');
                            var ou = document.createElement('u');
                            var oi = document.createElement('i');
                            $(oi).attr({
                                "data-ccid":data[i].mipOpenFossilInfo.id
                            }).css({
                                cursor:'pointer'
                            })
                            oi.onclick=function(){
                                var id=$(this).attr('data-ccid');
                                var that=this;
                                var a=$(this).hasClass('active');
                                if(Getcookie('userinfor')){
                                    if(!a){
                                        $.ajax({
                                            type:'GET',
                                            url:"../front/OCCollection/doCollect.do?collectionType=1&id="+id,
                                            dataType:"text",
                                            success:function(json){
                                                var datas=eval("("+json+")");
                                                $(that).addClass('active')
                                                layer.msg('收藏成功');
                                            }
                                        })
                                    }
                                    else{
                                        $.ajax({
                                            type:'GET',
                                            url:"../front/OCCollection/notCollect.do?collectionType=1&id="+id,
                                            dataType:"text",
                                            success:function(json){
                                                var datas=eval("("+json+")");
                                                $(that).removeClass('active')
                                                layer.msg('取消成功');
                                            }
                                        })
                                    }
                                }
                                else{
                                    layer.msg('请先登录');
                                }
                            };
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
        $scope.playAudio=function(){
            $scope.pplay=!$scope.pplay;
            if($scope.pplay){
                document.getElementById('paudio').play();
            }else{
                document.getElementById('paudio').pause();
            }
        };
        $scope.addCollection = function (e) {
                if(ipCookie('userinfor')){
                    var a = angular.element(e.target).hasClass('active');
                    if (a) {
                        angular.element(e.target).removeClass('active');
                        $http.get("../front/OCCollection/notCollect.do?collectionType="
                            + ($stateParams.type == 'Relic' ? 0 : 1) +
                            '&id=' + $stateParams.id)
                            .success(function (response) {
                                layer.msg('取消成功');
                            });
                        $window.location.reload();
                    } else {
                        angular.element(e.target).addClass('active');
                        $http.get("../front/OCCollection/doCollect.do?collectionType="
                            + ($stateParams.type == 'Relic' ? 0 : 1) +
                            '&id=' + $stateParams.id)
                            .success(function (response) {
                                layer.msg('收藏成功');
                            });
                        $window.location.reload();
                    }
                }
                else{
                    layer.msg('请先登录');
                }
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
    .controller('Displaylist.Pinner', ['$scope', '$http', '$rootScope', '$stateParams','$sce',function ($scope, $http, $rootScope, $stateParams,$sce) {
        $rootScope.showIndex = true;
        $scope.showData=false;
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
        $scope.sce=$sce.trustAsHtml;
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
                        $scope.showData=false;
                        $scope.nDatalist = response.data.newSpreList;
                        if(response.data.newSpreList.length==0){
                            $scope.showData=true;
                        }
                    } else if(response.data.pastSpreList) {
                        $scope.showData=false;
                        $scope.nDatalist = response.data.pastSpreList;
                        if(response.data.pastSpreList.length==0){
                            $scope.showData=true;
                        }
                    }
                    // console.log((response.data.newSpreList.length&&response.data.pastSpreList.length)==0);
                    console.log($scope.showData);
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
        $scope.showData=false;
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
                    if(response.data.length==0){
                        $scope.showData=true;
                    }
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
        $scope.showData=false;
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
                    if(response.data.length==0){
                        $scope.showData=true;
                    }
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
    .controller('Display.Details', ['$scope', '$http', '$stateParams', '$rootScope', '$sce',function ($scope, $http, $stateParams, $rootScope,$sce) {
        $rootScope.showIndex = true;
        $scope.curr = 1;
        $scope.pages = 5;
        $scope.sce=$sce.trustAsHtml;
        if ($stateParams.type == 'inner') {
            $scope.url='../spreadtrum/getOneSpreadtrum.do';
        }else{
            $scope.url='../otherSpreadtrum/getOneData.do';
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
    .controller('MuseumDetails', ['$scope', '$rootScope','$http','$stateParams', '$sce',function ($scope, $rootScope,$http,$stateParams,$sce) {
        $scope.Rating=function(num){
            if(num===1){
                return '一级博物馆';
            }
            else if(num===2){
                return '二级博物馆';
            }
            else if(num===3){
                return '三级博物馆';
            }
            else if(num===4){
                return '未定级博物馆';
            }
        };
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
            // angular.element(e.target).parent().prev().css("height",0);
            $scope.btn = ($scope.btn === "查看全部") ? '收起' : "查看全部";
        }
    }])
    //数字展厅
    .controller('Digization', ['$scope', "$http", '$rootScope', '$stateParams', function ($scope, $http, $rootScope, $stateParams) {
        $rootScope.showIndex = true;
        $scope.showData=false;
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
                    if(response.data.length==0){
                        $scope.showData=true;
                    }
                });
        }
        if ($stateParams.museum) {
            $scope.showTab = false;
            $scope.conditions.orgId = $stateParams.id;
            $scope.museum = $stateParams.museum;
            $scope.getDataList();
        }

    }])
    //等待开发页面
    .controller('wiki',['$scope','$state','$window',function($scope,$state,$window){
        $scope.gobackInex=function(){
            $state.go("home");
        }
        $scope.gobackpage=function(){
            $window.history.back();
        }
    }])
    ;