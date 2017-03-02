/**
 * Created by jerry on 2017/1/9.
 */
'use strict';

/* Controllers */
angular.module('myApp.controllers', [])
    .controller('ParentControl', ['$scope', '$rootScope', function ($scope, $rootScope) {
        $rootScope.showIndex = true;
    }])
    .controller('login', ['$scope', '$rootScope', '$http', function ($scope, $rootScope, $http) {
        $rootScope.showIndex = false;
        console.log($http)
        console.log($rootScope.showIndex);
        var height = $(window).height();
        $('.login').css('height', height);

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
        $scope.num=0;
        $scope.warr=false;
        $scope.msg='';
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
        $scope.check=function(){
            $scope.len=($scope.msg)?$scope.msg.length:0;
            (($scope.len+$scope.num)>=1000)?
                ($scope.warr=true):($scope.warr=false);
                console.log($scope.len);
            }
    }])
    .controller('index_parentControl', ['$scope', '$rootScope', function ($scope, $rootScope) {
        $rootScope.showIndex = true;
        $scope.msg = "hello word!";
        $scope.slider=function(){
            $('.slider').unslider({
                autoplay:true,
                delay:3000,
                arrows: {
                    prev: '<a class="unslider-arrow prev"></a>',
                    next: '<a class="unslider-arrow next"></a>',
                },
                animation:'fade'
            });
        }
        var mySwiper = new Swiper('.swiper-container', {
            loop: true,
            nextButton: '.swiper-button-next',
            prevButton: '.swiper-button-prev',
            slidesPerView: 4,
            paginationClickable: true,
            freeMode: true,
            observer:true,
            observeParents:true

        })
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
        $scope.slidess = [
            {ur: 'img/pic5.png'},
            {ur: 'img/pic5.png'},
            {ur: 'img/pic5.png'},
            {ur: 'img/pic5.png'},
            {ur: 'img/pic5.png'},
            {ur: 'img/pic5.png'},
            {ur: 'img/pic5.png'}
        ];
        $scope.myInterval = 5000;
        console.log($scope.slides);

    }])
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
    //藏品列表页
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
        $scope.selectedcondition = {year: '', unit: '', classify: '', sort: '最新', keyword: '', iPage: 1};
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
            // $http.get("../front/OCCollection/info.do?yearType="
            $http.get("data/collection_data1.json?yearType="
                + $scope.selectedcondition.year +
                '&collectionUnit=' + $scope.selectedcondition.unit +
                '&collectionsCategory=' + $scope.selectedcondition.classify +
                '&order=' + $scope.selectedcondition.sort +
                '&key=' + $scope.selectedcondition.keyword +
                '&currentPage=' + $scope.selectedcondition.iPage)
                .success(function (response) {
                    var data = response.data.mociList;
                    if ($scope.iPage == 5) {
                        //后续没有数据了
                        return;
                    }
                    for (var i = 0; i < data.length; i++) {
                        //获取高度最短的li
                        var _index = getShort();
                        var oDiv = document.createElement('div');
                        var oImg = document.createElement('img');
                        var ou = document.createElement('u');
                        var oi = document.createElement('i');
                        (data[i].isCollected) ?
                            ($(oi).addClass('active')) : ($(oi).removeClass('active'));
                        (data[i].mipOpenCulturalrelicInfo.threeDimensionalCollection) ?
                            ($(ou).addClass("is3d")) : ($(ou).removeClass("is3d"))
                        var ospan = document.createElement('span');
                        var oa = document.createElement('a');
                        $(oa).attr({
                            'href': "#/collectiondetails/Relic/" + data[i].mipOpenCulturalrelicInfo.id,
                            'target': "_blank"
                        });
                        oImg.src = data[i].mipOpenCulturalrelicInfo.fpic;
                        oImg.style.width = '278px';
                        oImg.style.height = data[i].mipOpenCulturalrelicInfo.height * ( 278 / data[i].mipOpenCulturalrelicInfo.fpicHeight ) + 'px';
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
                    getList();
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
            // $http.get("../front/OCCollection/info.do?yearType="
            $http.get("data/collection_data1.json?yearType="
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
            $scope.selectedcondition.sort = angular.element(e.target).html();
            $scope.selected.sort = angular.element(e.target).html();
            ;
            $('#ul1 li').html(" ");
            $scope.iPage = 1;
            getList();
        }

    }])
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
        $scope.selectedcondition = {year: '', unit: '', classify: '', sort: '最新', keyword: '', iPage: 1};
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
            $('#ul1 li').html(" ");
            $scope.checkCondition();

        }
        var oUl = document.getElementById('ul2');
        var aLi = oUl.getElementsByTagName('li');
        var iLen = aLi.length;
        var b = true;

        //初始化数据处理
        getList();
        function getList() {
            // $http.get("../front/OCFossil/info.do?yearType="
            $http.get("data/collection_data2.json?yearType="
                + $scope.selectedcondition.year +
                '&collectionUnit=' + $scope.selectedcondition.unit +
                '&collectionsCategory=' + $scope.selectedcondition.classify +
                '&order=' + $scope.selectedcondition.sort +
                '&key=' + $scope.selectedcondition.keyword +
                '&currentPage=' + $scope.selectedcondition.iPage)
                .success(function (response) {
                    var data = response.data.mociList;
                    if ($scope.iPage == 5) {
                        //后续没有数据了
                        return;
                    }
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
                            'href': "#/collectiondetails/Relic/" + data[i].mipOpenFossilInfo.id,
                            'target': "_blank"
                        });
                        oImg.src = data[i].mipOpenFossilInfo.fpic;
                        oImg.style.width = '278px';
                        oImg.style.height = data[i].mipOpenFossilInfo.height * ( 278 / data[i].mipOpenFossilInfo.fpicHeight ) + 'px';
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
                    getList();
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
            // $http.get("../front/OCFossil/info.do?yearType="
            $http.get("data/collection_data2.json?yearType="
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
        $scope.showKeyword = function (condition, val, e) {
            $scope.value = $("#collection-search").val();
            if ($scope.value && $scope.value != $scope.selectedcondition.keyword) {
                console.log($scope.arr);
                if ($scope.isKey) {
                    $scope[condition] = true;
                    $scope.selectedcondition.keyword = $scope.value;
                    $scope.selectedcondition.iPage = 1;
                    $scope.iPage = 1;
                    $('#ul2 li').html(" ");
                    getList();
                    $scope.checkCondition();
                } else {
                    $scope[condition] = true;
                    $scope.selectedcondition.keyword = $scope.value;
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
            $('#ul1 li').html(" ");
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
            $scope.selectedcondition.sort = angular.element(e.target).html();
            $scope.selected.sort = angular.element(e.target).html();
            ;
            $('#ul1 li').html(" ");
            $scope.iPage = 1;
            getList();
        }

    }])
    .controller('CollectionDetails', ['$scope', '$http', '$stateParams', '$window', '$rootScope', '$state',function ($scope, $http, $stateParams, $window, $rootScope,$state) {
        $rootScope.showIndex = true;
        $scope.$parent.showbtn = false;
        $scope.num = 0;
        $scope.num1 = 0;
        $scope.hasmoreleft = false;
        $scope.hasmoreright = true;
        $scope.hasmoreleft1 = false;
        $scope.hasmoreright1 = true;
        $scope.num2 = 0;
        $scope.addCollection = function (e) {
            var a = angular.element(e.target).hasClass('active');
            if (!a) {
                $scope.num2 += 1;
                angular.element(e.target).addClass('active');
                // $http.get("../front/Collected/doCollect.do?collectionType="
                $http.get("data/collection_details.json?collectionType="
                    + ($stateParams.type == 'Relic' ? 1 : 2) +
                    '&id=' + $stateParams.id)
                    .success(function (response) {
                        console.log(response);
                        // $scope.showMorecondition();
                    });
            } else {
                return
            }
        }
        $scope.getDetail = function () {
            // $http.get("../front/OCCollection/detail.do?id="
            $http.get("data/collection_details.json?id="
                + $stateParams.id)
                .success(function (response) {
                    $scope.data = response.data.mocid;
                    // $scope.showMorecondition();
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

                });
        }
        $scope.goVideo=function(e){
            var url=angular.element(e.target).attr('data-url');
            $state.go('collectinodetailsvideo');
        }
        $scope.getDetail();
    }])
    .controller('CollectionDetailsVideo', ['$scope', '$http', '$stateParams', '$window', '$rootScope', function ($scope, $http, $stateParams, $window, $rootScope){
        $rootScope.showIndex = false;
        $scope.video=function(){
            var myPlayer = videojs('my-player');
            videojs("my-player").ready(function(){
                $('#my-player').css('width',$(document).width());
                $('#my-player').css('height',$(document).height());
            });
        }
        $scope.video();
    }])
    //展览列表父控制器
    .controller('Displaylist', ['$scope', '$rootScope', '$stateParams', function ($scope, $rootScope, $stateParams) {
        $rootScope.showIndex = true;
        $scope.tabpage = 1;
        $scope.tabChange = function (tabpage) {
            console.log(tabpage);
            $scope.tabpage = tabpage;
        }
        console.log($stateParams);
    }])
    //省内展览
    .controller('Displaylist.Pinner', ['$scope', '$http', '$rootScope', '$stateParams', function ($scope, $http, $rootScope, $stateParams) {
        $rootScope.showIndex = true;
        $scope.remove = true;
        $scope.curr = 1;
        $scope.pages = 5;
        $scope.tabsubpage = 1;
        $scope.keyword = '';
        $scope.area = '';
        $scope.isA = false;
        $scope.isK = false;
        $scope.conditions = {
            currentPage: $scope.curr,
            spreType: $scope.tabsubpage,
            musExhibition: $scope.area,
            content: $scope.keyword
        }
        $scope.arr = [];
        $scope.isClassify = true;
        $scope.isArea = false;
        $scope.isSelected = false;
        $scope.isunit = false;
        $scope.getConditions = function () {
            $http({
                method: 'GET',
                url: 'data/display.json',
                params: $scope.conditions
            })
                .success(function (response) {
                    $scope.conditionData = response.data.cityList;
                    console.log($scope.conditionData)
                    console.log(response)
                })
        }
        $scope.getDataList = function () {
            $http({
                method: 'GET',
                url: 'data/display.json',
                params: $scope.conditions
            })
                .success(function (response) {
                    if (response.data.newSpreList) {
                        $scope.nDatalist = response.data.newSpreList;
                    } else {
                        $scope.pDatalist = response.data.pastSpreList;
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
            $scope.conditions.musExhibition = angular.element(e.target).attr('data-id');
            $scope.checkCondition();
            $scope.laypage();
        }
        $scope.removeArea = function () {
            $scope.arr.pop();
            $scope.conditions.musExhibition = '';
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
            if ($scope.value && $scope.value != $scope.conditions.content) {
                console.log($scope.arr);
                if ($scope.isK) {
                    $scope.conditions.content = $scope.value;
                    $scope.conditions.currentPage = 1;
                    $scope.laypage();
                    $scope.checkCondition();
                } else {
                    $scope.isK = true;
                    $scope.conditions.content = $scope.value;
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
            $scope.conditions.content = '';
            $scope.conditions.currentPage = 1;
            $scope.arr.pop();
            $scope.laypage();
            $scope.checkCondition();
        }
        $scope.laypage = function () {
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
                    console.log($scope.pages);
                }
            });
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
    .controller('Displaylist.Pouter', ['$scope', '$http', '$rootScope', '$stateParams', function ($scope, $http, $rootScope, $stateParams) {
        $rootScope.showIndex = true;
        $scope.remove = true;
        $scope.curr = 1;
        $scope.pages = 5;
        $scope.tabsubpage = 1;
        $scope.keyword = '';
        $scope.area = '';
        $scope.isA = false;
        $scope.isK = false;
        $scope.conditions = {
            currentPage: $scope.curr,
            spreType: $scope.tabsubpage,
            musExhibition: $scope.area,
            content: $scope.keyword
        }
        $scope.arr = [];
        $scope.isClassify = true;
        $scope.isArea = false;
        $scope.isSelected = false;
        $scope.isunit = false;
        $scope.getConditions = function () {
            $http({
                method: 'GET',
                url: 'data/display.json',
                params: $scope.conditions
            })
                .success(function (response) {
                    $scope.conditionData = response.data.cityList;
                })
        }
        $scope.getDataList = function () {
            $http({
                method: 'GET',
                url: 'data/display.json',
                params: $scope.conditions
            })
                .success(function (response) {
                    if (response.data.newSpreList) {
                        $scope.nDatalist = response.data.newSpreList;
                    } else {
                        $scope.pDatalist = response.data.pastSpreList;
                    }
                    response.page.totalPage = $scope.pages;
                })
        }
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
            $scope.conditions.musExhibition = angular.element(e.target).attr('data-id');
            $scope.checkCondition();
            $scope.laypage();
        }
        $scope.removeArea = function () {
            $scope.arr.pop();
            $scope.conditions.musExhibition = '';
            $scope.isArea = false;
            $scope.isClassify = true;
            $scope.isA = false;
            $scope.conditions.currentPage = 1;
            $scope.checkCondition();
            $scope.laypage();
        }
        //显示关键字
        $scope.showKeyword = function () {
            $scope.value = $('#search_box1').val().trim();
            console.log($scope.value);
            if ($scope.value && $scope.value != $scope.conditions.content) {
                console.log($scope.arr);
                if ($scope.isK) {
                    $scope.conditions.content = $scope.value;
                    $scope.conditions.currentPage = 1;
                    $scope.laypage();
                    $scope.checkCondition();
                } else {
                    $scope.isK = true;
                    $scope.conditions.content = $scope.value;
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
            $scope.conditions.content = '';
            $scope.conditions.currentPage = 1;
            $scope.arr.pop();
            $scope.getDataList();
            $scope.checkCondition();
        }
        $scope.laypage = function () {
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
        }
        $scope.laypage();
        console.log($stateParams);
        console.log($stateParams.museum);
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
    .controller('Displaylist.Outer', ['$scope', '$http', '$rootScope', '$stateParams', function ($scope, $http, $rootScope, $stateParams) {
        $rootScope.showIndex = true;
        $scope.remove = true;
        $scope.curr = 1;
        $scope.pages = 5;
        $scope.tabsubpage = 1;
        $scope.keyword = '';
        $scope.area = '';
        $scope.isA = false;
        $scope.isK = false;
        $scope.conditions = {
            currentPage: $scope.curr,
            spreType: $scope.tabsubpage,
            musExhibition: $scope.area,
            content: $scope.keyword
        }
        $scope.arr = [];
        $scope.isClassify = true;
        $scope.isArea = false;
        $scope.isSelected = false;
        $scope.isunit = false;
        $scope.getConditions = function () {
            $http({
                method: 'GET',
                url: 'data/display.json',
                params: $scope.conditions
            })
                .success(function (response) {
                    $scope.conditionData = response.data.cityList;
                    console.log($scope.conditionData)
                    console.log(response)
                })
        }
        $scope.getDataList = function () {
            $http({
                method: 'GET',
                url: 'data/display.json',
                params: $scope.conditions
            })
                .success(function (response) {
                    if (response.data.newSpreList) {
                        $scope.nDatalist = response.data.newSpreList;
                    } else {
                        $scope.pDatalist = response.data.pastSpreList;
                    }
                    response.page.totalPage = $scope.pages;
                })
        }
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
            $scope.conditions.musExhibition = angular.element(e.target).attr('data-id');
            $scope.checkCondition();
            $scope.laypage();
        }
        $scope.removeArea = function () {
            $scope.arr.pop();
            $scope.conditions.musExhibition = '';
            $scope.isArea = false;
            $scope.isClassify = true;
            $scope.isA = false;
            $scope.conditions.currentPage = 1;
            $scope.checkCondition();
            $scope.laypage();
        }
        //显示关键字
        $scope.showKeyword = function () {
            $scope.value = $('#search_box1').val().trim();
            console.log($scope.value);
            if ($scope.value && $scope.value != $scope.conditions.content) {
                console.log($scope.arr);
                if ($scope.isK) {
                    $scope.conditions.content = $scope.value;
                    $scope.conditions.currentPage = 1;
                    $scope.laypage();
                    $scope.checkCondition();
                } else {
                    $scope.isK = true;
                    $scope.conditions.content = $scope.value;
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
            $scope.conditions.content = '';
            $scope.conditions.currentPage = 1;
            $scope.arr.pop();
            $scope.getDataList();
            $scope.checkCondition();
        }
        $scope.laypage = function () {
            laypage({
                cont: $('.PagePlugs'),
                pages: $scope.pages, //可以叫服务端把总页数放在某一个隐藏域，再获取。假设我们获取到的是18
                curr: 1,
                skin: '#ea703a',
                groups: 5, //连续显示分页数
                jump: function (obj) { //触发分页后的回调
                    $scope.conditions.currentPage = obj.curr;
                    $scope.getDataList();
                    console.log($scope.pages);
                }
            });
        }
        $scope.laypage();
        console.log($stateParams);
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
    //展览详情页
    .controller('Display.Details', ['$scope', '$http', '$stateParams', '$rootScope', function ($scope, $http, $stateParams, $rootScope) {
        $rootScope.showIndex = true;
        $scope.curr = 1;
        $scope.pages = 5;
        if ($stateParams.type == 'inner') {
            $http({
                method: 'GET',
                url: 'data/display-details.json',
                params: {id: $stateParams.id}
            })
                .success(function (response) {
                    $scope.detailsData = response.data;
                })
        }

    }])
    .controller('Museum', ['$scope', '$scope', '$rootScope', '$stateParams', function ($scope, $stateParams, $rootScope) {
        $rootScope.showIndex = true;
    }])
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
            url: 'data/data_map.json'
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
    .controller('MuseumDetails', ['$scope', '$rootScope', function ($scope, $rootScope) {

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
    // .controller('MuseumDetailsMoreCollection', ['$scope', '$rootScope', function ($scope, $rootScope) {
    //     $rootScope.showIndex = true;
    //     $scope.curr = 1;
    //     $scope.pages = 5;
    //     laypage({
    //         cont: $('.PagePlugs'),
    //         pages: $scope.pages, //可以叫服务端把总页数放在某一个隐藏域，再获取。假设我们获取到的是18
    //         curr: $scope.curr,
    //         skin: '#ea703a',
    //         groups: 3, //连续显示分页数
    //         jump: function (obj) { //触发分页后的回调
    //             $scope.curr = obj.curr;
    //             // $scope.getDataList();
    //         }
    //     });
    // }])
    // .controller('MuseumDetailsMoreDisplay', ['$scope', '$rootScope', function ($scope, $rootScope) {
    //     $rootScope.showIndex = true;
    //     $scope.curr = 1;
    //     $scope.pages = 5;
    //     laypage({
    //         cont: $('.PagePlugs'),
    //         pages: $scope.pages, //可以叫服务端把总页数放在某一个隐藏域，再获取。假设我们获取到的是18
    //         curr: $scope.curr,
    //         skin: '#ea703a',
    //         groups: 3, //连续显示分页数
    //         jump: function (obj) { //触发分页后的回调
    //             $scope.curr = obj.curr;
    //             // $scope.getDataList();
    //         }
    //     });
    // }])
    // .controller('MuseumDetailsMoreDigization', ['$scope', function ($scope, $rootScope) {
    //     $rootScope.showIndex = true;
    //     $scope.curr = 1;
    //     $scope.pages = 5;
    //     laypage({
    //         cont: $('.PagePlugs'),
    //         pages: $scope.pages, //可以叫服务端把总页数放在某一个隐藏域，再获取。假设我们获取到的是18
    //         curr: $scope.curr,
    //         skin: '#ea703a',
    //         groups: 3, //连续显示分页数
    //         jump: function (obj) { //触发分页后的回调
    //             $scope.curr = obj.curr;
    //             // $scope.getDataList();
    //         }
    //     });
    // }])
    .controller('Digization', ['$scope', "$http", '$rootScope', '$stateParams',function ($scope, $http, $rootScope, $stateParams) {
        $rootScope.showIndex = true;
        $scope.showMore=function(e){
            angular.element(e.target).addClass('showmore').removeClass('hide')
        }
        $scope.hide=function(e){
            angular.element(e.target).removeClass('showmore').addClass('hide')
        };
        $scope.tabpage = 1;
        $scope.page = 1;
        $scope.museum = '';
        $scope.conditions = {
            currentPage: $scope.page,
            flag: $scope.tabpage,
            museum: $scope.museum,
            size: '3'
        }
        $scope.changeTab = function (page) {
            $scope.tabpage = page;
            $scope.conditions.flag = page;
            $scope.getDataList();
        }
        // // $http.get("../virtual/getPCVirtual.do?currentPage="+$scope.curr)
        // $http.get("data/v.json?currentPage=" + $scope.curr)
        //     .success(function (response) {
        //
        //     });
        $scope.laypage = function () {
            $http({
                method: "GET",
                url: "data/v.json",
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
                });
        }
        $scope.laypage();
        $scope.getDataList = function () {
            $http({
                method: "GET",
                url: "data/v.json",
                params: $scope.conditions
            })
                .success(function (response) {
                    $scope.data = response.data;
                });
        }
        if ($stateParams.museum) {
            $scope.conditions.museum = $stateParams.id;
            $scope.museum = $stateParams.museum;
            $scope.getDataList();
        }

    }])
;
