/**
 * Created by jerry on 2017/1/9.
 */
'use strict';


// Declare app level module which depends on filters, and services
angular.module('myApp', [
    'ipCookie',
    'ngSanitize',
    'myApp.filters',
    'myApp.services',
    'myApp.directives',
    'myApp.controllers',
    'myApp.router'
])
;