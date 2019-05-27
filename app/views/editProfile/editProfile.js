app.controller('EditCtrl',function($scope,$rootScope,$localStorage,$timeout,cryptography,$location,verify,$routeParams) {
	$scope.contactFormat = /^[0-9]{10,12}$/;
	$scope.ageFormat = /^[1-9][0-9]*$/
	
	$scope.verifyIsAdmin = function(){
		let user = verify.login();
		if($localStorage.users[user]['uType'] == 'A'){
			$scope.getEditUser();
		}else{
			$scope.checkOneself(user);
		}
	}
	
	$scope.getEditUser = function(){
		let routeUser = cryptography.decrypt($routeParams.userid);
		$scope.editUser = angular.copy($localStorage.users[routeUser]);
		$scope.gender = $scope.editUser.gender == 'F'?{ male : 'notActive',female : 'active'}:{ male : 'active',female : 'notActive'};
	}
	
	$scope.checkOneself = function(usr){
		let routeUser = cryptography.decrypt($routeParams.userid);
		if(routeUser != usr){
			$location.path('home');
		}else{
			$scope.getEditUser();
		}
	}
	$scope.genderEvent = function(value) {
        $scope.editUser.gender = value;
        $scope.gender.male = value=='M'?'active':'notActive';
        $scope.gender.female = value=='F'?'active':'notActive';
    }
	
	$scope.updateUser = function(){
		let routeUser = cryptography.decrypt($routeParams.userid);
		$localStorage.users[routeUser] = $scope.editUser;
		let element = angular.element('#updateModal');
		element.modal('show');
	}
	
	$scope.verifyIsAdmin();
});