/**
*  Module
*
* Description
*/
var reportsapp = angular.module('reports', []);

reportsapp.controller('reportsController', ['$scope', '$window','reportsService',function($scope, $window, reportsService){
	
	$scope.reportsCtrl = this;

	this.logonToken = null;
	this.phonenumber = "345-345-2345";

	this.logon = function(){
		if(this.logonToken == null){
			reportsService.boelogon(function(results){
				console.log(results);
				this.logonToken = results.data.logonToken;
				if(this.logonToken != null){
					this.logonStatus = true;
					this.logonMessage = "Login Success !!!"
				}
			}.bind(this));
		}

	}

	this.logoff = function(){
		reportsService.boelogoff(function(results){
			console.log(results);
			this.logonToken = null;
		}.bind(this));
	}

	this.getAbout = function(){
		reportsService.boeAbout(this.logonToken, function(results){
			console.log(results);
			this.boinfo = results.data.about.title +" - "+ results.data.about.vendor;
			Materialize.toast('I am a toast!', 4000);
		}.bind(this));
	}


	this.submit = function(){
		reportsService.get(this.logonToken, function(results){
			this.folderList = results.data.search.folder;
            console.log("results "+this.folderList);
		}.bind(this));
	}

	this.fetchSub = function(id){
        this.showDocumentDetailsCard = false;
		reportsService.getAllReports(this.logonToken, id, function(results){

			this.subFoldersList = results.data.search.folder;
			console.log(this.subFoldersList);
			this.reportsList = results.data.search.document;
			console.log(this.reportsList);
		}.bind(this));
	}


	this.showDocumentDetails = function(document){


		console.log(document.id + " " + document.cuid);

		reportsService.getDocumentDetail(this.logonToken, document.id, function(results){
			console.log(results.data.document);
            this.showDocumentDetailsCard = true;
		    this.documentInfo = results.data.document;
		}.bind(this));



	}

	this.validatePhonenum = function(){
		const PHONE_NUMBER_REGEXP = /^(?:(?:\+?1\s*(?:[.-]\s*)?)?(?:\(\s*([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9])\s*\)|([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9]))\s*(?:[.-]\s*)?)?([0-9]|[2-9][02-9]1|[2-9][02-9]{2})\s*(?:[.-]\s*)?([0-9]{4})$/;
		console.log("Entered number "+this.phonenumber);

		var x = this.phonenumber;//.toString().trim().replace(/^\+/, '');
		var country, city, number;

		if(x.match(PHONE_NUMBER_REGEXP)){
			x = x.toString().replace(/[^0-9a-zA-Z]/gi, '');
			console.log(" x after trim "+x);
		}
		else{
			this.finalnumber = "";
			return false;
		}
		this.finalnumber = callme(x);
		console.log("final value "+ this.finalnumber);
	}	

	callme = function(value){
		city = value.slice(0, 3);
        number = value.slice(3);

	if(number){
            if(number.length>3){
                number = number.slice(0, 3) + '-' + number.slice(3,7);
            }
            else{
                number = number;
            }

            return ("(" + city + ") " + number).trim();
        }

        return number;
	}

}]);


reportsapp.directive('phoneInput', function($filter, $browser){
	return{

		require: 'ngModel',
		link: function($scope, $element, $attrs, ngModelCtrl){
		const PHONE_NUMBER_REGEXP = /^(?:(?:\+?1\s*(?:[.-]\s*)?)?(?:\(\s*([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9])\s*\)|([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9]))\s*(?:[.-]\s*)?)?([0-9]|[2-9][02-9]1|[2-9][02-9]{2})\s*(?:[.-]\s*)?([0-9]{4})$/;
		console.log("in directive number "+ $element);

		}




	}
});

reportsapp.service('reportsService', ['$http', function($http){

	var boelogon = function(cb){
		$http({
			method: 'GET',
			url: '/EsbiDemoPortal/rest/logon'
		})
		.then(cb);
	};

	var boelogoff = function(cb){
		$http({
			method: 'GET',
			url: '/EsbiDemoPortal/rest/logoff'
		})
		.then(cb);
	};

	var boeAbout = function(token, cb){
		$http({
			method: 'GET',
			url: '/EsbiDemoPortal/rest/about/' + token
		})
		.then(cb);
	};

	var getMain = function(token, cb){
        let paramsBean = {
            "logonToken": token,
            "folderId": 6220,
            "documentId": 0
            }
        let paramsBeanObj = {
            "paramsBean": paramsBean
        }
        console.log("object to json ==> "+angular.toJson(paramsBeanObj));
		$http({
			method: 'POST',
			url: '/EsbiDemoPortal/rest/mainfolders',
			data: angular.toJson(paramsBeanObj)
		})
		.then(cb);


	};

	var getAllReports = function(token, folderId, cb){
        let paramsBean = {
            "logonToken": token,
            "folderId": folderId,
            "documentId": 0
            }
        let paramsBeanObj = {
            "paramsBean": paramsBean
        }
		$http({
			method: 'POST',
			url: '/EsbiDemoPortal/rest/documents/',
            data: angular.toJson(paramsBeanObj)
		})
		.then(cb);
	};

	var getDocumentDetail = function(token, documentId, cb){
        let paramsBean = {
            "logonToken": token,
            "folderId": 0,
            "documentId": documentId
            }
        let paramsBeanObj = {
            "paramsBean": paramsBean
        }
		$http({
			method: 'POST',
			url: '/EsbiDemoPortal/rest/documentinfo/',
            data: angular.toJson(paramsBeanObj)
		})
		.then(cb);
	}


	return{
		get: getMain,
		boelogon: boelogon,
		boelogoff: boelogoff,
		boeAbout: boeAbout,
		getAllReports: getAllReports,
		getDocumentDetail: getDocumentDetail

	}
	
}]);
