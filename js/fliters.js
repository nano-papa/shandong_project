/**
 * Created by jerry on 2017/1/9.
 */
'use strict';

/* Filters */

angular.module('myApp.filters', [])
    .filter('unique', function () {
    return function (collection, keyname) {
        var output = [],
            keys = [];
        angular.forEach(collection, function (item) {
            var key = item[keyname];
            if (keys.indexOf(key) === -1) {
                keys.push(key);
                output.push(item);
            }
        });
        return output;
    };
})
    .filter('filterQQface', function () {
        //查看结果
        return function (str) {
            if(str){
                str = str.replace(/\</g, '&lt;');
                str = str.replace(/\>/g, '&gt;');
                str = str.replace(/\n/g, '<br/>');
                str = str.replace(/\[em_([0-9]*)\]/g, '<img src="img/arclist/$1.gif" border="0" />');
            }
            return str;
        }
    });
