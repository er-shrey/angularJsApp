app.controller('HomeCtrl', function($scope,$rootScope,$localStorage,$timeout,cryptography,$location, verify) {
	$scope.currentUser = sessionStorage.loggedIn;
	
	$scope.verifyIsAdmin = function(){
		let user = verify.login();
		$scope.users = angular.copy($localStorage.users);
		if($scope.users[user]['uType'] == 'A'){
			$scope.isAdmin = true;
		}else{
			$scope.isAdmin = false;
		}
	}
	
	$scope.doAction = function(actionType, user){
		if($scope.isAdmin == true){
			if(actionType == 'edit'){
				$location.path('edit/'+cryptography.encrypt(user));
			}else{
				$scope.tempDelUser = user;
				let element = angular.element('#deleteModal');
				element.modal('show');
			}
		}
	}
	
	$scope.deleteUser = function(){
		console.log("deleting", $scope.tempDelUser);
		delete $scope.users[$scope.tempDelUser];
		$localStorage.users = angular.copy($scope.users);
	}
	
	$scope.verifyIsAdmin();
});