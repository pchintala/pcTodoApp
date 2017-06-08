/**
*  Module
*
* Description
*/
var reportsapp = angular.module('reports', []);

reportsapp.controller('reportsController', ['$scope', 'reportsService',function($scope, reportsService){
	
	$scope.reportsCtrl = this;

	this.logon = function(){
		reportsService.boelogon(function(results){
			console.log(results);
			this.logonToken = results.data.logonToken;
			if(this.logonToken != null)
				this.logonMessage = "Success !!!"
		}.bind(this));
	}

	this.logoff = function(){
		reportsService.boelogoff(function(results){
			console.log(results);
			//this.logonToken = results.data.logonToken;
		}.bind(this));
	}

	this.getAbout = function(){
		reportsService.boeAbout(this.logonToken, function(results){
			console.log(results);
			this.boinfo = results.data.about.title +" - "+ results.data.about.vendor;
		}.bind(this));
	}


	this.submit = function(){
		reportsService.get(this.logonToken, function(results){
			console.log(results);
			this.folderList = results.data.search.folder;
		}.bind(this));
	}

	this.fetchReports = function(id){
		reportsService.getAllReports(this.logonToken, id, function(results){
			console.log(results);
			this.reportsList = results.data.search.document;
		}.bind(this));
	}	

}]);

reportsapp.service('reportsService', ['$http', function($http){

	var boelogon = function(cb){
		$http({
			method: 'GET',
			url: 'http://localhost:8080/EsbiApp/rest/logon'
		})
		.then(cb);
	};

	var boelogoff = function(cb){
		$http({
			method: 'GET',
			url: 'http://localhost:8080/EsbiApp/rest/logoff'
		})
		.then(cb);
	};

	var boeAbout = function(token, cb){
		$http({
			method: 'GET',
			url: 'http://localhost:8080/EsbiApp/rest/about/' + token
		})
		.then(cb);
	};

	var getMain = function(token, cb){
		$http({
			method: 'POST',
			url: 'http://localhost:8080/EsbiApp/rest/mainfolders/' + token
		})
		.then(cb);
	};

	var getAllReports = function(token, folderId, cb){
		$http({
			method: 'POST',
			url: 'http://localhost:8080/EsbiApp/rest/reports/' + token + '/' +folderId
		})
		.then(cb);
	};


	return{
		get: getMain,
		boelogon: boelogon,
		boelogoff: boelogoff,
		boeAbout: boeAbout,
		getAllReports: getAllReports

	}
	
}]);