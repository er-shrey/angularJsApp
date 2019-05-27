app.controller('SignupCtrl', function($scope,$localStorage,cryptography,$location,$timeout) {
	$scope.emailExist = {
		value : false,
		toolTip: 'Not a valid Email!'
	};
	$scope.signup = {};
	$scope.signup.gender = 'M';
	$scope.gender = { male : 'active',
		female : 'notActive'
	};
	$scope.nameFormat = /^[a-zA-Z]+$/;
	$scope.contactFormat = /^[0-9]{10,12}$/;
	$scope.emailFormat = /^[a-z]+[a-z0-9._-]+@[a-z]+\.[a-z.]{2,25}$/;
	$scope.passwordFormat = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$!%*?&])[A-Za-z\d@#$!%*?&]{8,}$/;
	$scope.ageFormat = /^[1-9][0-9]*$/;
	$scope.showPass = 'password';
	
    $scope.genderEvent = function(value) {
        $scope.signup.gender = value;
        $scope.gender.male = value=='M'?'active':'notActive';
        $scope.gender.female = value=='F'?'active':'notActive';
    };

    $scope.signupUser = function() {
        if($scope.signup.firstName && $scope.signup.lastName &&
            $scope.signup.email && $scope.signup.contact &&
            $scope.signup.password && $scope.confirmPassword &&
            $scope.signup.gender && $scope.signup.age && $scope.signup.uType){
            }
            // Logic to check whether email address already exist in database
			$scope.userList = $localStorage.users?$localStorage.users:{};
            if($scope.userList.hasOwnProperty($scope.signup.email)){
                $scope.emailExist = {value : true, toolTip: 'Email already exist.'};
				let element = angular.element('#userExistModal');
				element.modal('show');
			}
            else {
				let signUpData = angular.copy($scope.signup);
				signUpData.password = cryptography.encrypt(signUpData.password);
                $scope.userList[$scope.signup.email] = signUpData;
                $localStorage.users = $scope.userList;
				let element = angular.element('#successModal');
				element.modal('show');
            }
    };
	
	$scope.showTnC = function(){
		let element = angular.element('#tncModal');
		element.modal('show');
	}
	
	$scope.clearAll = function(){
		$timeout(function(){
			$location.path('login');
		},1000);
	}
});