angular.module('docsIsolateScopeDirective', [])
.controller('Controller', ['$scope','$compile', function($scope,$compile) {
  $scope.naomi = { name: 'Naomi', address: '1600 Amphitheatre' };
  $scope.igor = { name: 'Igor', address: '123 Somewhere' };
  $scope.form1 = [];
  $scope.adminid=1;
  $scope.customerid=1;
  // $scope.form1.push($scope.igor);
  $scope.addCustomer= function(){
  	var e1 = $compile("<new-customer form1='form1' customerid='customerid'></new-customer><hr>")($scope);
  	$(".addnew").append(e1);
  };

  $scope.addAdmin= function(){
  	var e1 = $compile("<new-admin form1='form1' adminid='adminid'></new-admin><hr>")($scope);
  	$(".addnew").append(e1);
  };

}])
.directive('newCustomer', function() {
  return {
    restrict: 'E',
    replace : true,
    scope: {
      // customerInfo: '=info'
      form1 : '=form1',
      customerid : '=customerid'
    },
    link : function(scope, elem, attr){
    	scope.customerInfo = { customerid : scope.customerid, name: 'customername', address: '123 Somewhere' };
    	scope.form1.push(scope.customerInfo);
    	scope.customerid++;
    },
    templateUrl: 'directivetemplate1.html'
  };
}).directive('newAdmin', function() {
  return {
    restrict: 'E',
    replace : true,
    scope: {
      // customerInfo: '=info'
      form1 : '=form1',
      adminid : '=adminid'
    },
    link : function(scope, elem, attr){    	
    	scope.adminInfo = { adminid : scope.adminid, name: 'studentname', rollno: '2495', anotherParam: 'no adminidea' };
    	scope.form1.push(scope.adminInfo);
    	scope.adminid++;

    	scope.admindelete = function(deleteid){
    		scope.$destroy();
    	};
    },
    templateUrl: 'directivetemplate2.html'
  };
});

