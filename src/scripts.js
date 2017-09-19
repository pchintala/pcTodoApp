/**
* todoApp Module
*
* Description
*/
angular.module('todoApp', [
	'ui.router', 
	'todo',
	'states',
	'reports'
])
.config(function($stateProvider, $urlRouterProvider){
	var basePath = 'src/app/';

	$urlRouterProvider.otherwise('/');
	$stateProvider
		.state('todo',{
			url: '/',
			templateUrl: basePath + 'todo/todo.html',
			controller: 'todoController as todoCtrl'
		})
		.state('states',{
			url: '/states',
			templateUrl: basePath + '/states/states.html',
			controller: 'statesController as statesCtrl'
		})
		.state('reports',{
			url: '/reports',
			templateUrl: basePath + '/bo/reports.html',
			controller: 'reportsController as reportsCtrl'
		})
		;
});


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
/**
* states Module
*
* Description
*/
angular.module('states', [])
	.controller('statesController', ['$scope', 'states', function($scope, states){
			$scope.statesCtrl = this;

			this.listCountries = function() {

				states.getAllCountries(function(results){
					this.allcountries = results.data.RestResponse.result;
					console.log(this.allcountries);
				}.bind(this));
			}

			this.search = function() {
				//alert(this.mystate);
				if(this.mystate){
					// earlier states.get
					states.getStatesByCountryCode(this.mystate, function(results){

						this.mystateArray = results.data.RestResponse.result;
				
					}.bind(this));
				}

				
			}


			/*this.clear = function(evt){
				this.mystate = '';

			}*/

	}])
	.service('states', ['$http', function($http){
		
		this.getStatesByCountryCode = function(countryCode, cb){
			$http({
				method: 'GET',
				url: 'http://services.groupkt.com/state/get/' + countryCode + '/all'
			})
			.then(cb);
		};

		/*return {
			get: getStatesByCountryCode
		}*/

		this.getAllCountries = function(cb){
			$http({
				method: 'GET',
				url: 'http://services.groupkt.com/country/get/all'
			})
			.then(cb);	

		};

		
	}]);	
/**
* todo Module
*
* Description
*/
angular.module('todo', [])
	.controller('todoController', ['$scope', 'todoModel', function($scope, model){
		$scope.todoCtrl = this;
		$scope.title = "My new Program";

		this.todos = model.todos;

		this.submit = function onSubmit(){
			alert("Submitted!"+ this.newTodo);
			this.todos.push({
				text: this.newTodo,
				edit: false
			})
			this.newTodo = '';
		}

		this.edit = function onEdit(idx){
			this.todos[idx].edit = !this.todos[idx].edit
		};

		this.delete = function onDelete(idx){
			this.todos.splice(idx, 1);
		};



		$scope.names = model.names;

		$scope.onClick = function (){
			$scope.names.push($scope.entryName);
		}


	
}])
	.service('todoModel',  function(){
		
		var names = ['maggie','zomato','perks','cries']
		// return {
		// 	names: names
		// }

		var todos = [];

		return {
			todos: todos,
			names: names
		}
	});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyIsImJvL3JlcG9ydHMtbW9kdWxlLmpzIiwic3RhdGVzL3N0YXRlcy1tb2R1bGUuanMiLCJ0b2RvL3RvZG8tbW9kdWxlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNsQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNqT0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDOURBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJzY3JpcHRzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXHJcbiogdG9kb0FwcCBNb2R1bGVcclxuKlxyXG4qIERlc2NyaXB0aW9uXHJcbiovXHJcbmFuZ3VsYXIubW9kdWxlKCd0b2RvQXBwJywgW1xyXG5cdCd1aS5yb3V0ZXInLCBcclxuXHQndG9kbycsXHJcblx0J3N0YXRlcycsXHJcblx0J3JlcG9ydHMnXHJcbl0pXHJcbi5jb25maWcoZnVuY3Rpb24oJHN0YXRlUHJvdmlkZXIsICR1cmxSb3V0ZXJQcm92aWRlcil7XHJcblx0dmFyIGJhc2VQYXRoID0gJ3NyYy9hcHAvJztcclxuXHJcblx0JHVybFJvdXRlclByb3ZpZGVyLm90aGVyd2lzZSgnLycpO1xyXG5cdCRzdGF0ZVByb3ZpZGVyXHJcblx0XHQuc3RhdGUoJ3RvZG8nLHtcclxuXHRcdFx0dXJsOiAnLycsXHJcblx0XHRcdHRlbXBsYXRlVXJsOiBiYXNlUGF0aCArICd0b2RvL3RvZG8uaHRtbCcsXHJcblx0XHRcdGNvbnRyb2xsZXI6ICd0b2RvQ29udHJvbGxlciBhcyB0b2RvQ3RybCdcclxuXHRcdH0pXHJcblx0XHQuc3RhdGUoJ3N0YXRlcycse1xyXG5cdFx0XHR1cmw6ICcvc3RhdGVzJyxcclxuXHRcdFx0dGVtcGxhdGVVcmw6IGJhc2VQYXRoICsgJy9zdGF0ZXMvc3RhdGVzLmh0bWwnLFxyXG5cdFx0XHRjb250cm9sbGVyOiAnc3RhdGVzQ29udHJvbGxlciBhcyBzdGF0ZXNDdHJsJ1xyXG5cdFx0fSlcclxuXHRcdC5zdGF0ZSgncmVwb3J0cycse1xyXG5cdFx0XHR1cmw6ICcvcmVwb3J0cycsXHJcblx0XHRcdHRlbXBsYXRlVXJsOiBiYXNlUGF0aCArICcvYm8vcmVwb3J0cy5odG1sJyxcclxuXHRcdFx0Y29udHJvbGxlcjogJ3JlcG9ydHNDb250cm9sbGVyIGFzIHJlcG9ydHNDdHJsJ1xyXG5cdFx0fSlcclxuXHRcdDtcclxufSk7XHJcblxyXG4iLCIvKipcclxuKiAgTW9kdWxlXHJcbipcclxuKiBEZXNjcmlwdGlvblxyXG4qL1xyXG52YXIgcmVwb3J0c2FwcCA9IGFuZ3VsYXIubW9kdWxlKCdyZXBvcnRzJywgW10pO1xyXG5cclxucmVwb3J0c2FwcC5jb250cm9sbGVyKCdyZXBvcnRzQ29udHJvbGxlcicsIFsnJHNjb3BlJywgJyR3aW5kb3cnLCdyZXBvcnRzU2VydmljZScsZnVuY3Rpb24oJHNjb3BlLCAkd2luZG93LCByZXBvcnRzU2VydmljZSl7XHJcblx0XHJcblx0JHNjb3BlLnJlcG9ydHNDdHJsID0gdGhpcztcclxuXHJcblx0dGhpcy5sb2dvblRva2VuID0gbnVsbDtcclxuXHR0aGlzLnBob25lbnVtYmVyID0gXCIzNDUtMzQ1LTIzNDVcIjtcclxuXHJcblx0dGhpcy5sb2dvbiA9IGZ1bmN0aW9uKCl7XHJcblx0XHRpZih0aGlzLmxvZ29uVG9rZW4gPT0gbnVsbCl7XHJcblx0XHRcdHJlcG9ydHNTZXJ2aWNlLmJvZWxvZ29uKGZ1bmN0aW9uKHJlc3VsdHMpe1xyXG5cdFx0XHRcdGNvbnNvbGUubG9nKHJlc3VsdHMpO1xyXG5cdFx0XHRcdHRoaXMubG9nb25Ub2tlbiA9IHJlc3VsdHMuZGF0YS5sb2dvblRva2VuO1xyXG5cdFx0XHRcdGlmKHRoaXMubG9nb25Ub2tlbiAhPSBudWxsKXtcclxuXHRcdFx0XHRcdHRoaXMubG9nb25TdGF0dXMgPSB0cnVlO1xyXG5cdFx0XHRcdFx0dGhpcy5sb2dvbk1lc3NhZ2UgPSBcIkxvZ2luIFN1Y2Nlc3MgISEhXCJcclxuXHRcdFx0XHR9XHJcblx0XHRcdH0uYmluZCh0aGlzKSk7XHJcblx0XHR9XHJcblx0XHRcclxuXHR9XHJcblxyXG5cdHRoaXMubG9nb2ZmID0gZnVuY3Rpb24oKXtcclxuXHRcdHJlcG9ydHNTZXJ2aWNlLmJvZWxvZ29mZihmdW5jdGlvbihyZXN1bHRzKXtcclxuXHRcdFx0Y29uc29sZS5sb2cocmVzdWx0cyk7XHJcblx0XHRcdHRoaXMubG9nb25Ub2tlbiA9IG51bGw7XHJcblx0XHR9LmJpbmQodGhpcykpO1xyXG5cdH1cclxuXHJcblx0dGhpcy5nZXRBYm91dCA9IGZ1bmN0aW9uKCl7XHJcblx0XHRyZXBvcnRzU2VydmljZS5ib2VBYm91dCh0aGlzLmxvZ29uVG9rZW4sIGZ1bmN0aW9uKHJlc3VsdHMpe1xyXG5cdFx0XHRjb25zb2xlLmxvZyhyZXN1bHRzKTtcclxuXHRcdFx0dGhpcy5ib2luZm8gPSByZXN1bHRzLmRhdGEuYWJvdXQudGl0bGUgK1wiIC0gXCIrIHJlc3VsdHMuZGF0YS5hYm91dC52ZW5kb3I7XHJcblx0XHRcdE1hdGVyaWFsaXplLnRvYXN0KCdJIGFtIGEgdG9hc3QhJywgNDAwMCk7XHJcblx0XHR9LmJpbmQodGhpcykpO1xyXG5cdH1cclxuXHJcblxyXG5cdHRoaXMuc3VibWl0ID0gZnVuY3Rpb24oKXtcclxuXHRcdHJlcG9ydHNTZXJ2aWNlLmdldCh0aGlzLmxvZ29uVG9rZW4sIGZ1bmN0aW9uKHJlc3VsdHMpe1xyXG5cdFx0XHR0aGlzLmZvbGRlckxpc3QgPSByZXN1bHRzLmRhdGEuc2VhcmNoLmZvbGRlcjtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJyZXN1bHRzIFwiK3RoaXMuZm9sZGVyTGlzdCk7XHJcblx0XHR9LmJpbmQodGhpcykpO1xyXG5cdH1cclxuXHJcblx0dGhpcy5mZXRjaFN1YiA9IGZ1bmN0aW9uKGlkKXtcclxuICAgICAgICB0aGlzLnNob3dEb2N1bWVudERldGFpbHNDYXJkID0gZmFsc2U7XHJcblx0XHRyZXBvcnRzU2VydmljZS5nZXRBbGxSZXBvcnRzKHRoaXMubG9nb25Ub2tlbiwgaWQsIGZ1bmN0aW9uKHJlc3VsdHMpe1xyXG5cdFx0XHRcclxuXHRcdFx0dGhpcy5zdWJGb2xkZXJzTGlzdCA9IHJlc3VsdHMuZGF0YS5zZWFyY2guZm9sZGVyO1xyXG5cdFx0XHRjb25zb2xlLmxvZyh0aGlzLnN1YkZvbGRlcnNMaXN0KTtcclxuXHRcdFx0dGhpcy5yZXBvcnRzTGlzdCA9IHJlc3VsdHMuZGF0YS5zZWFyY2guZG9jdW1lbnQ7XHJcblx0XHRcdGNvbnNvbGUubG9nKHRoaXMucmVwb3J0c0xpc3QpO1xyXG5cdFx0fS5iaW5kKHRoaXMpKTtcclxuXHR9XHJcblxyXG5cdFxyXG5cdHRoaXMuc2hvd0RvY3VtZW50RGV0YWlscyA9IGZ1bmN0aW9uKGRvY3VtZW50KXtcclxuXHJcblxyXG5cdFx0Y29uc29sZS5sb2coZG9jdW1lbnQuaWQgKyBcIiBcIiArIGRvY3VtZW50LmN1aWQpO1xyXG5cclxuXHRcdHJlcG9ydHNTZXJ2aWNlLmdldERvY3VtZW50RGV0YWlsKHRoaXMubG9nb25Ub2tlbiwgZG9jdW1lbnQuaWQsIGZ1bmN0aW9uKHJlc3VsdHMpe1xyXG5cdFx0XHRjb25zb2xlLmxvZyhyZXN1bHRzLmRhdGEuZG9jdW1lbnQpO1xyXG4gICAgICAgICAgICB0aGlzLnNob3dEb2N1bWVudERldGFpbHNDYXJkID0gdHJ1ZTtcclxuXHRcdCAgICB0aGlzLmRvY3VtZW50SW5mbyA9IHJlc3VsdHMuZGF0YS5kb2N1bWVudDtcclxuXHRcdH0uYmluZCh0aGlzKSk7XHJcblxyXG5cdFx0XHJcblx0XHRcclxuXHR9XHJcblxyXG5cdHRoaXMudmFsaWRhdGVQaG9uZW51bSA9IGZ1bmN0aW9uKCl7XHJcblx0XHRjb25zdCBQSE9ORV9OVU1CRVJfUkVHRVhQID0gL14oPzooPzpcXCs/MVxccyooPzpbLi1dXFxzKik/KT8oPzpcXChcXHMqKFsyLTldMVswMi05XXxbMi05XVswMi04XTF8WzItOV1bMDItOF1bMDItOV0pXFxzKlxcKXwoWzItOV0xWzAyLTldfFsyLTldWzAyLThdMXxbMi05XVswMi04XVswMi05XSkpXFxzKig/OlsuLV1cXHMqKT8pPyhbMC05XXxbMi05XVswMi05XTF8WzItOV1bMDItOV17Mn0pXFxzKig/OlsuLV1cXHMqKT8oWzAtOV17NH0pJC87XHJcblx0XHRjb25zb2xlLmxvZyhcIkVudGVyZWQgbnVtYmVyIFwiK3RoaXMucGhvbmVudW1iZXIpO1xyXG5cclxuXHRcdHZhciB4ID0gdGhpcy5waG9uZW51bWJlcjsvLy50b1N0cmluZygpLnRyaW0oKS5yZXBsYWNlKC9eXFwrLywgJycpO1xyXG5cdFx0dmFyIGNvdW50cnksIGNpdHksIG51bWJlcjtcclxuXHJcblx0XHRpZih4Lm1hdGNoKFBIT05FX05VTUJFUl9SRUdFWFApKXtcclxuXHRcdFx0eCA9IHgudG9TdHJpbmcoKS5yZXBsYWNlKC9bXjAtOWEtekEtWl0vZ2ksICcnKTtcclxuXHRcdFx0Y29uc29sZS5sb2coXCIgeCBhZnRlciB0cmltIFwiK3gpO1xyXG5cdFx0fVxyXG5cdFx0ZWxzZXtcclxuXHRcdFx0dGhpcy5maW5hbG51bWJlciA9IFwiXCI7XHJcblx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdH1cclxuXHRcdHRoaXMuZmluYWxudW1iZXIgPSBjYWxsbWUoeCk7XHJcblx0XHRjb25zb2xlLmxvZyhcImZpbmFsIHZhbHVlIFwiKyB0aGlzLmZpbmFsbnVtYmVyKTtcdFxyXG5cdH1cdFxyXG5cclxuXHRjYWxsbWUgPSBmdW5jdGlvbih2YWx1ZSl7XHJcblx0XHRjaXR5ID0gdmFsdWUuc2xpY2UoMCwgMyk7XHJcbiAgICAgICAgbnVtYmVyID0gdmFsdWUuc2xpY2UoMyk7XHJcblxyXG5cdGlmKG51bWJlcil7XHJcbiAgICAgICAgICAgIGlmKG51bWJlci5sZW5ndGg+Myl7XHJcbiAgICAgICAgICAgICAgICBudW1iZXIgPSBudW1iZXIuc2xpY2UoMCwgMykgKyAnLScgKyBudW1iZXIuc2xpY2UoMyw3KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICAgICAgbnVtYmVyID0gbnVtYmVyO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gKFwiKFwiICsgY2l0eSArIFwiKSBcIiArIG51bWJlcikudHJpbSgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIG51bWJlcjtcclxuXHR9XHJcblxyXG59XSk7XHJcblxyXG5cclxucmVwb3J0c2FwcC5kaXJlY3RpdmUoJ3Bob25lSW5wdXQnLCBmdW5jdGlvbigkZmlsdGVyLCAkYnJvd3Nlcil7XHJcblx0cmV0dXJue1xyXG5cclxuXHRcdHJlcXVpcmU6ICduZ01vZGVsJyxcclxuXHRcdGxpbms6IGZ1bmN0aW9uKCRzY29wZSwgJGVsZW1lbnQsICRhdHRycywgbmdNb2RlbEN0cmwpe1xyXG5cdFx0Y29uc3QgUEhPTkVfTlVNQkVSX1JFR0VYUCA9IC9eKD86KD86XFwrPzFcXHMqKD86Wy4tXVxccyopPyk/KD86XFwoXFxzKihbMi05XTFbMDItOV18WzItOV1bMDItOF0xfFsyLTldWzAyLThdWzAyLTldKVxccypcXCl8KFsyLTldMVswMi05XXxbMi05XVswMi04XTF8WzItOV1bMDItOF1bMDItOV0pKVxccyooPzpbLi1dXFxzKik/KT8oWzAtOV18WzItOV1bMDItOV0xfFsyLTldWzAyLTldezJ9KVxccyooPzpbLi1dXFxzKik/KFswLTldezR9KSQvO1xyXG5cdFx0Y29uc29sZS5sb2coXCJpbiBkaXJlY3RpdmUgbnVtYmVyIFwiKyAkZWxlbWVudCk7XHJcblxyXG5cdFx0fVxyXG5cclxuXHRcdFxyXG5cclxuXHJcblx0fVxyXG59KTtcclxuXHJcbnJlcG9ydHNhcHAuc2VydmljZSgncmVwb3J0c1NlcnZpY2UnLCBbJyRodHRwJywgZnVuY3Rpb24oJGh0dHApe1xyXG5cclxuXHR2YXIgYm9lbG9nb24gPSBmdW5jdGlvbihjYil7XHJcblx0XHQkaHR0cCh7XHJcblx0XHRcdG1ldGhvZDogJ0dFVCcsXHJcblx0XHRcdHVybDogJy9Fc2JpRGVtb1BvcnRhbC9yZXN0L2xvZ29uJ1xyXG5cdFx0fSlcclxuXHRcdC50aGVuKGNiKTtcclxuXHR9O1xyXG5cclxuXHR2YXIgYm9lbG9nb2ZmID0gZnVuY3Rpb24oY2Ipe1xyXG5cdFx0JGh0dHAoe1xyXG5cdFx0XHRtZXRob2Q6ICdHRVQnLFxyXG5cdFx0XHR1cmw6ICcvRXNiaURlbW9Qb3J0YWwvcmVzdC9sb2dvZmYnXHJcblx0XHR9KVxyXG5cdFx0LnRoZW4oY2IpO1xyXG5cdH07XHJcblxyXG5cdHZhciBib2VBYm91dCA9IGZ1bmN0aW9uKHRva2VuLCBjYil7XHJcblx0XHQkaHR0cCh7XHJcblx0XHRcdG1ldGhvZDogJ0dFVCcsXHJcblx0XHRcdHVybDogJy9Fc2JpRGVtb1BvcnRhbC9yZXN0L2Fib3V0LycgKyB0b2tlblxyXG5cdFx0fSlcclxuXHRcdC50aGVuKGNiKTtcclxuXHR9O1xyXG5cclxuXHR2YXIgZ2V0TWFpbiA9IGZ1bmN0aW9uKHRva2VuLCBjYil7XHJcbiAgICAgICAgbGV0IHBhcmFtc0JlYW4gPSB7XHJcbiAgICAgICAgICAgIFwibG9nb25Ub2tlblwiOiB0b2tlbixcclxuICAgICAgICAgICAgXCJmb2xkZXJJZFwiOiA2MjIwLFxyXG4gICAgICAgICAgICBcImRvY3VtZW50SWRcIjogMFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgbGV0IHBhcmFtc0JlYW5PYmogPSB7XHJcbiAgICAgICAgICAgIFwicGFyYW1zQmVhblwiOiBwYXJhbXNCZWFuXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnNvbGUubG9nKFwib2JqZWN0IHRvIGpzb24gPT0+IFwiK2FuZ3VsYXIudG9Kc29uKHBhcmFtc0JlYW5PYmopKTtcclxuXHRcdCRodHRwKHtcclxuXHRcdFx0bWV0aG9kOiAnUE9TVCcsXHJcblx0XHRcdHVybDogJy9Fc2JpRGVtb1BvcnRhbC9yZXN0L21haW5mb2xkZXJzJyxcclxuXHRcdFx0ZGF0YTogYW5ndWxhci50b0pzb24ocGFyYW1zQmVhbk9iailcclxuXHRcdH0pXHJcblx0XHQudGhlbihjYik7XHJcbiAgICAgICAgXHJcbiAgICAgICAgXHJcblx0fTtcclxuXHJcblx0dmFyIGdldEFsbFJlcG9ydHMgPSBmdW5jdGlvbih0b2tlbiwgZm9sZGVySWQsIGNiKXtcclxuICAgICAgICBsZXQgcGFyYW1zQmVhbiA9IHtcclxuICAgICAgICAgICAgXCJsb2dvblRva2VuXCI6IHRva2VuLFxyXG4gICAgICAgICAgICBcImZvbGRlcklkXCI6IGZvbGRlcklkLFxyXG4gICAgICAgICAgICBcImRvY3VtZW50SWRcIjogMFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgbGV0IHBhcmFtc0JlYW5PYmogPSB7XHJcbiAgICAgICAgICAgIFwicGFyYW1zQmVhblwiOiBwYXJhbXNCZWFuXHJcbiAgICAgICAgfVxyXG5cdFx0JGh0dHAoe1xyXG5cdFx0XHRtZXRob2Q6ICdQT1NUJyxcclxuXHRcdFx0dXJsOiAnL0VzYmlEZW1vUG9ydGFsL3Jlc3QvZG9jdW1lbnRzLycsXHJcbiAgICAgICAgICAgIGRhdGE6IGFuZ3VsYXIudG9Kc29uKHBhcmFtc0JlYW5PYmopXHJcblx0XHR9KVxyXG5cdFx0LnRoZW4oY2IpO1xyXG5cdH07XHJcblxyXG5cdHZhciBnZXREb2N1bWVudERldGFpbCA9IGZ1bmN0aW9uKHRva2VuLCBkb2N1bWVudElkLCBjYil7XHJcbiAgICAgICAgbGV0IHBhcmFtc0JlYW4gPSB7XHJcbiAgICAgICAgICAgIFwibG9nb25Ub2tlblwiOiB0b2tlbixcclxuICAgICAgICAgICAgXCJmb2xkZXJJZFwiOiAwLFxyXG4gICAgICAgICAgICBcImRvY3VtZW50SWRcIjogZG9jdW1lbnRJZFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgbGV0IHBhcmFtc0JlYW5PYmogPSB7XHJcbiAgICAgICAgICAgIFwicGFyYW1zQmVhblwiOiBwYXJhbXNCZWFuXHJcbiAgICAgICAgfVxyXG5cdFx0JGh0dHAoe1xyXG5cdFx0XHRtZXRob2Q6ICdQT1NUJyxcclxuXHRcdFx0dXJsOiAnL0VzYmlEZW1vUG9ydGFsL3Jlc3QvZG9jdW1lbnRpbmZvLycsXHJcbiAgICAgICAgICAgIGRhdGE6IGFuZ3VsYXIudG9Kc29uKHBhcmFtc0JlYW5PYmopXHJcblx0XHR9KVxyXG5cdFx0LnRoZW4oY2IpO1xyXG5cdH1cclxuXHJcblxyXG5cdHJldHVybntcclxuXHRcdGdldDogZ2V0TWFpbixcclxuXHRcdGJvZWxvZ29uOiBib2Vsb2dvbixcclxuXHRcdGJvZWxvZ29mZjogYm9lbG9nb2ZmLFxyXG5cdFx0Ym9lQWJvdXQ6IGJvZUFib3V0LFxyXG5cdFx0Z2V0QWxsUmVwb3J0czogZ2V0QWxsUmVwb3J0cyxcclxuXHRcdGdldERvY3VtZW50RGV0YWlsOiBnZXREb2N1bWVudERldGFpbFxyXG5cclxuXHR9XHJcblx0XHJcbn1dKTsiLCIvKipcclxuKiBzdGF0ZXMgTW9kdWxlXHJcbipcclxuKiBEZXNjcmlwdGlvblxyXG4qL1xyXG5hbmd1bGFyLm1vZHVsZSgnc3RhdGVzJywgW10pXHJcblx0LmNvbnRyb2xsZXIoJ3N0YXRlc0NvbnRyb2xsZXInLCBbJyRzY29wZScsICdzdGF0ZXMnLCBmdW5jdGlvbigkc2NvcGUsIHN0YXRlcyl7XHJcblx0XHRcdCRzY29wZS5zdGF0ZXNDdHJsID0gdGhpcztcclxuXHJcblx0XHRcdHRoaXMubGlzdENvdW50cmllcyA9IGZ1bmN0aW9uKCkge1xyXG5cclxuXHRcdFx0XHRzdGF0ZXMuZ2V0QWxsQ291bnRyaWVzKGZ1bmN0aW9uKHJlc3VsdHMpe1xyXG5cdFx0XHRcdFx0dGhpcy5hbGxjb3VudHJpZXMgPSByZXN1bHRzLmRhdGEuUmVzdFJlc3BvbnNlLnJlc3VsdDtcclxuXHRcdFx0XHRcdGNvbnNvbGUubG9nKHRoaXMuYWxsY291bnRyaWVzKTtcclxuXHRcdFx0XHR9LmJpbmQodGhpcykpO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHR0aGlzLnNlYXJjaCA9IGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRcdC8vYWxlcnQodGhpcy5teXN0YXRlKTtcclxuXHRcdFx0XHRpZih0aGlzLm15c3RhdGUpe1xyXG5cdFx0XHRcdFx0Ly8gZWFybGllciBzdGF0ZXMuZ2V0XHJcblx0XHRcdFx0XHRzdGF0ZXMuZ2V0U3RhdGVzQnlDb3VudHJ5Q29kZSh0aGlzLm15c3RhdGUsIGZ1bmN0aW9uKHJlc3VsdHMpe1xyXG5cclxuXHRcdFx0XHRcdFx0dGhpcy5teXN0YXRlQXJyYXkgPSByZXN1bHRzLmRhdGEuUmVzdFJlc3BvbnNlLnJlc3VsdDtcclxuXHRcdFx0XHRcclxuXHRcdFx0XHRcdH0uYmluZCh0aGlzKSk7XHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRcclxuXHRcdFx0fVxyXG5cclxuXHJcblx0XHRcdC8qdGhpcy5jbGVhciA9IGZ1bmN0aW9uKGV2dCl7XHJcblx0XHRcdFx0dGhpcy5teXN0YXRlID0gJyc7XHJcblxyXG5cdFx0XHR9Ki9cclxuXHJcblx0fV0pXHJcblx0LnNlcnZpY2UoJ3N0YXRlcycsIFsnJGh0dHAnLCBmdW5jdGlvbigkaHR0cCl7XHJcblx0XHRcclxuXHRcdHRoaXMuZ2V0U3RhdGVzQnlDb3VudHJ5Q29kZSA9IGZ1bmN0aW9uKGNvdW50cnlDb2RlLCBjYil7XHJcblx0XHRcdCRodHRwKHtcclxuXHRcdFx0XHRtZXRob2Q6ICdHRVQnLFxyXG5cdFx0XHRcdHVybDogJ2h0dHA6Ly9zZXJ2aWNlcy5ncm91cGt0LmNvbS9zdGF0ZS9nZXQvJyArIGNvdW50cnlDb2RlICsgJy9hbGwnXHJcblx0XHRcdH0pXHJcblx0XHRcdC50aGVuKGNiKTtcclxuXHRcdH07XHJcblxyXG5cdFx0LypyZXR1cm4ge1xyXG5cdFx0XHRnZXQ6IGdldFN0YXRlc0J5Q291bnRyeUNvZGVcclxuXHRcdH0qL1xyXG5cclxuXHRcdHRoaXMuZ2V0QWxsQ291bnRyaWVzID0gZnVuY3Rpb24oY2Ipe1xyXG5cdFx0XHQkaHR0cCh7XHJcblx0XHRcdFx0bWV0aG9kOiAnR0VUJyxcclxuXHRcdFx0XHR1cmw6ICdodHRwOi8vc2VydmljZXMuZ3JvdXBrdC5jb20vY291bnRyeS9nZXQvYWxsJ1xyXG5cdFx0XHR9KVxyXG5cdFx0XHQudGhlbihjYik7XHRcclxuXHJcblx0XHR9O1xyXG5cclxuXHRcdFxyXG5cdH1dKTtcdCIsIi8qKlxyXG4qIHRvZG8gTW9kdWxlXHJcbipcclxuKiBEZXNjcmlwdGlvblxyXG4qL1xyXG5hbmd1bGFyLm1vZHVsZSgndG9kbycsIFtdKVxyXG5cdC5jb250cm9sbGVyKCd0b2RvQ29udHJvbGxlcicsIFsnJHNjb3BlJywgJ3RvZG9Nb2RlbCcsIGZ1bmN0aW9uKCRzY29wZSwgbW9kZWwpe1xyXG5cdFx0JHNjb3BlLnRvZG9DdHJsID0gdGhpcztcclxuXHRcdCRzY29wZS50aXRsZSA9IFwiTXkgbmV3IFByb2dyYW1cIjtcclxuXHJcblx0XHR0aGlzLnRvZG9zID0gbW9kZWwudG9kb3M7XHJcblxyXG5cdFx0dGhpcy5zdWJtaXQgPSBmdW5jdGlvbiBvblN1Ym1pdCgpe1xyXG5cdFx0XHRhbGVydChcIlN1Ym1pdHRlZCFcIisgdGhpcy5uZXdUb2RvKTtcclxuXHRcdFx0dGhpcy50b2Rvcy5wdXNoKHtcclxuXHRcdFx0XHR0ZXh0OiB0aGlzLm5ld1RvZG8sXHJcblx0XHRcdFx0ZWRpdDogZmFsc2VcclxuXHRcdFx0fSlcclxuXHRcdFx0dGhpcy5uZXdUb2RvID0gJyc7XHJcblx0XHR9XHJcblxyXG5cdFx0dGhpcy5lZGl0ID0gZnVuY3Rpb24gb25FZGl0KGlkeCl7XHJcblx0XHRcdHRoaXMudG9kb3NbaWR4XS5lZGl0ID0gIXRoaXMudG9kb3NbaWR4XS5lZGl0XHJcblx0XHR9O1xyXG5cclxuXHRcdHRoaXMuZGVsZXRlID0gZnVuY3Rpb24gb25EZWxldGUoaWR4KXtcclxuXHRcdFx0dGhpcy50b2Rvcy5zcGxpY2UoaWR4LCAxKTtcclxuXHRcdH07XHJcblxyXG5cclxuXHJcblx0XHQkc2NvcGUubmFtZXMgPSBtb2RlbC5uYW1lcztcclxuXHJcblx0XHQkc2NvcGUub25DbGljayA9IGZ1bmN0aW9uICgpe1xyXG5cdFx0XHQkc2NvcGUubmFtZXMucHVzaCgkc2NvcGUuZW50cnlOYW1lKTtcclxuXHRcdH1cclxuXHJcblxyXG5cdFxyXG59XSlcclxuXHQuc2VydmljZSgndG9kb01vZGVsJywgIGZ1bmN0aW9uKCl7XHJcblx0XHRcclxuXHRcdHZhciBuYW1lcyA9IFsnbWFnZ2llJywnem9tYXRvJywncGVya3MnLCdjcmllcyddXHJcblx0XHQvLyByZXR1cm4ge1xyXG5cdFx0Ly8gXHRuYW1lczogbmFtZXNcclxuXHRcdC8vIH1cclxuXHJcblx0XHR2YXIgdG9kb3MgPSBbXTtcclxuXHJcblx0XHRyZXR1cm4ge1xyXG5cdFx0XHR0b2RvczogdG9kb3MsXHJcblx0XHRcdG5hbWVzOiBuYW1lc1xyXG5cdFx0fVxyXG5cdH0pOyJdfQ==
