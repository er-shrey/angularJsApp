app.controller('DashboardCtrl', function($scope,$rootScope,$localStorage,$timeout,cryptography,$location, verify) {
	$scope.verifyIsAdmin = function(){
		let user = verify.login();
		$scope.users = angular.copy($localStorage.users);
		$scope.tempTableData = angular.copy($scope.users);
		$scope.fullName = $scope.users[user]['firstName']+" "+$scope.users[user]['lastName'];
	}
	
	$scope.selectedCols = {
		'fullName': true,
		'email': true,
		'uType': true
	}
	
	$scope.updateTable = function(){
		$scope.tempTableData = angular.copy($scope.users);
		$scope.selectedCols = {
			'fullName': $scope.columnFilter.includes('fullName'),
			'email': $scope.columnFilter.includes('email'),
			'uType': $scope.columnFilter.includes('uType')
		}
		if($scope.uTypeFilter.includes('A') && $scope.selectedCols.uType){
			if($scope.uTypeFilter.includes('U')){
				//Do Nothing
			}
			else{
				angular.forEach($scope.tempTableData, function(val, key){
					if(val.uType == "U"){
						delete $scope.tempTableData[key];
					}
				});
			}
		}else{
			if($scope.uTypeFilter.includes('U')){
				angular.forEach($scope.tempTableData, function(val, key){
					if(val.uType == "A"){
						delete $scope.tempTableData[key];
					}
				});
			}
			else{
				// Default Select all as there is no selection
			}
		}
	}
	
	$scope.verifyIsAdmin();
});