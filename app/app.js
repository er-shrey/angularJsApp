var app = angular.module('myApp', [
  'ngRoute',
  'ngStorage'
]).
config(function($locationProvider, $routeProvider, $httpProvider) {
  $locationProvider.hashPrefix('!');
  $httpProvider.interceptors.push('APIInterceptor');
  $routeProvider.when('/login', {
    templateUrl: 'views/login/login.html',
    controller: 'LoginCtrl'
  });
  $routeProvider.when('/signup', {
    templateUrl: 'views/signup/signup.html',
    controller: 'SignupCtrl'
  });
  $routeProvider.when('/home', {
    templateUrl: 'views/home/home.html',
    controller: 'HomeCtrl'
  });
  $routeProvider.when('/dashboard', {
    templateUrl: 'views/dashboard/dashboard.html',
    controller: 'DashboardCtrl'
  });
  $routeProvider.when('/edit/:userid', {
    templateUrl: 'views/editProfile/editProfile.html',
    controller: 'EditCtrl'
  });
  $routeProvider.otherwise({redirectTo: '/login'});
});

/*--------------- Application Interceptor ---------------*/
app.service('APIInterceptor', ['$localStorage','$location','$rootScope',function($localStorage,$location,$rootScope) {
    var service = this;
	$localStorage.token = window.sessionToken;
	var jwtInterceptor = {
        request: function(config) {
            config.headers.Authorization= "application key and JWT";
            return config;
        },
		responseError: function(rejection) {
			console.log('Error in response ', rejection.status);
			if ((rejection.status === 403) || (rejection.status === 404)) {
				window.open('#!/login', '_self');
			}
			return rejection;
		}
    };
    return jwtInterceptor;
}]);

/*--------------- Validator ---------------*/
app.directive("validateField", function() {
    return {
        restrict : "E",
        scope : {
            isValid : "=",
			tooltip : "="
        },
        template : '<div class="input-group-append" ng-hide="isValid" data-toggle="tooltip" data-placement="top" title="{{tooltip}}"><span class="btn btn-danger"><i class="fa fa-times"></i></span></div><div class="input-group-append" ng-show="isValid"><span class="btn btn-success"><i class="fa fa-check"></i></span></div>'
    };
});

/*--------------- Nav Bar ---------------*/
app.directive("navMenu", function($localStorage,$location) {
    return {
        restrict : "E",
        scope : {
            page : "=",
			username: "="
        },
        templateUrl : 'views/navMenu/navMenu.html',
		controller: ['$scope', function($scope) {
            $scope.logout = function(){
				sessionStorage.removeItem('loggedIn');
				$location.path('login');
			}
        }]
    };
});

/*--------------- ATOB service ---------------*/
app.service('cryptography', function (){
	this.encrypt = function(str) {
		return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g,
			function toSolidBytes(match, p1) {
				return String.fromCharCode('0x' + p1);
		}));
	}
	
	this.decrypt = function(str) {
		return decodeURIComponent(atob(str).split('').map(function(c) {
			return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
		}).join(''));
	}
});

/*--------------- ATOB service ---------------*/
app.service('verify', function ($localStorage,cryptography,$location){
	this.login = function() {
		let str = sessionStorage.loggedIn;
		if(str!=undefined){
			let user = cryptography.decrypt(str);
			if($localStorage.users.hasOwnProperty(user)){
				return user;
			}else{
				$location.path('login');
			}
		}else{
			$location.path('login');
		}
	}
});