app.controller('LoginCtrl', function($scope,$rootScope,$localStorage,$timeout,cryptography,$location) {
	$scope.emailFormat = /^[a-z]+[a-z0-9._-]+@[a-z]+\.[a-z.]{2,25}$/;
	$scope.errorMessage = "";
	$scope.signIn = function(){
		$scope.userList = $localStorage.users?$localStorage.users:{};
		if($scope.userList.hasOwnProperty($scope.username)){
			$scope.validate($scope.username, $scope.password);
		}else{
			$scope.errorMessage = "User doesn't exist";
			$scope.removeError();
		}
	}
	
	$scope.validate = function(user, pass){
		let encryptPass = cryptography.encrypt($scope.password);
		if(encryptPass == $scope.userList[user]['password']){
			sessionStorage.loggedIn = cryptography.encrypt(user);
			$location.path('home');
		}else{
			$scope.errorMessage = "Invalid Credentials";
			$scope.removeError();
		}
	}
	
	$scope.removeError = function(){
		$timeout(function(){
			$scope.errorMessage = "";
		},3000);
	}
});