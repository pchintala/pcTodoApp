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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyIsImJvL3JlcG9ydHMtbW9kdWxlLmpzIiwic3RhdGVzL3N0YXRlcy1tb2R1bGUuanMiLCJ0b2RvL3RvZG8tbW9kdWxlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNsQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3ZHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUM5REE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6InNjcmlwdHMuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcclxuKiB0b2RvQXBwIE1vZHVsZVxyXG4qXHJcbiogRGVzY3JpcHRpb25cclxuKi9cclxuYW5ndWxhci5tb2R1bGUoJ3RvZG9BcHAnLCBbXHJcblx0J3VpLnJvdXRlcicsIFxyXG5cdCd0b2RvJyxcclxuXHQnc3RhdGVzJyxcclxuXHQncmVwb3J0cydcclxuXSlcclxuLmNvbmZpZyhmdW5jdGlvbigkc3RhdGVQcm92aWRlciwgJHVybFJvdXRlclByb3ZpZGVyKXtcclxuXHR2YXIgYmFzZVBhdGggPSAnc3JjL2FwcC8nO1xyXG5cclxuXHQkdXJsUm91dGVyUHJvdmlkZXIub3RoZXJ3aXNlKCcvJyk7XHJcblx0JHN0YXRlUHJvdmlkZXJcclxuXHRcdC5zdGF0ZSgndG9kbycse1xyXG5cdFx0XHR1cmw6ICcvJyxcclxuXHRcdFx0dGVtcGxhdGVVcmw6IGJhc2VQYXRoICsgJ3RvZG8vdG9kby5odG1sJyxcclxuXHRcdFx0Y29udHJvbGxlcjogJ3RvZG9Db250cm9sbGVyIGFzIHRvZG9DdHJsJ1xyXG5cdFx0fSlcclxuXHRcdC5zdGF0ZSgnc3RhdGVzJyx7XHJcblx0XHRcdHVybDogJy9zdGF0ZXMnLFxyXG5cdFx0XHR0ZW1wbGF0ZVVybDogYmFzZVBhdGggKyAnL3N0YXRlcy9zdGF0ZXMuaHRtbCcsXHJcblx0XHRcdGNvbnRyb2xsZXI6ICdzdGF0ZXNDb250cm9sbGVyIGFzIHN0YXRlc0N0cmwnXHJcblx0XHR9KVxyXG5cdFx0LnN0YXRlKCdyZXBvcnRzJyx7XHJcblx0XHRcdHVybDogJy9yZXBvcnRzJyxcclxuXHRcdFx0dGVtcGxhdGVVcmw6IGJhc2VQYXRoICsgJy9iby9yZXBvcnRzLmh0bWwnLFxyXG5cdFx0XHRjb250cm9sbGVyOiAncmVwb3J0c0NvbnRyb2xsZXIgYXMgcmVwb3J0c0N0cmwnXHJcblx0XHR9KVxyXG5cdFx0O1xyXG59KTtcclxuXHJcbiIsIi8qKlxyXG4qICBNb2R1bGVcclxuKlxyXG4qIERlc2NyaXB0aW9uXHJcbiovXHJcbnZhciByZXBvcnRzYXBwID0gYW5ndWxhci5tb2R1bGUoJ3JlcG9ydHMnLCBbXSk7XHJcblxyXG5yZXBvcnRzYXBwLmNvbnRyb2xsZXIoJ3JlcG9ydHNDb250cm9sbGVyJywgWyckc2NvcGUnLCAncmVwb3J0c1NlcnZpY2UnLGZ1bmN0aW9uKCRzY29wZSwgcmVwb3J0c1NlcnZpY2Upe1xyXG5cdFxyXG5cdCRzY29wZS5yZXBvcnRzQ3RybCA9IHRoaXM7XHJcblxyXG5cdHRoaXMubG9nb24gPSBmdW5jdGlvbigpe1xyXG5cdFx0cmVwb3J0c1NlcnZpY2UuYm9lbG9nb24oZnVuY3Rpb24ocmVzdWx0cyl7XHJcblx0XHRcdGNvbnNvbGUubG9nKHJlc3VsdHMpO1xyXG5cdFx0XHR0aGlzLmxvZ29uVG9rZW4gPSByZXN1bHRzLmRhdGEubG9nb25Ub2tlbjtcclxuXHRcdFx0aWYodGhpcy5sb2dvblRva2VuICE9IG51bGwpXHJcblx0XHRcdFx0dGhpcy5sb2dvbk1lc3NhZ2UgPSBcIlN1Y2Nlc3MgISEhXCJcclxuXHRcdH0uYmluZCh0aGlzKSk7XHJcblx0fVxyXG5cclxuXHR0aGlzLmxvZ29mZiA9IGZ1bmN0aW9uKCl7XHJcblx0XHRyZXBvcnRzU2VydmljZS5ib2Vsb2dvZmYoZnVuY3Rpb24ocmVzdWx0cyl7XHJcblx0XHRcdGNvbnNvbGUubG9nKHJlc3VsdHMpO1xyXG5cdFx0XHQvL3RoaXMubG9nb25Ub2tlbiA9IHJlc3VsdHMuZGF0YS5sb2dvblRva2VuO1xyXG5cdFx0fS5iaW5kKHRoaXMpKTtcclxuXHR9XHJcblxyXG5cdHRoaXMuZ2V0QWJvdXQgPSBmdW5jdGlvbigpe1xyXG5cdFx0cmVwb3J0c1NlcnZpY2UuYm9lQWJvdXQodGhpcy5sb2dvblRva2VuLCBmdW5jdGlvbihyZXN1bHRzKXtcclxuXHRcdFx0Y29uc29sZS5sb2cocmVzdWx0cyk7XHJcblx0XHRcdHRoaXMuYm9pbmZvID0gcmVzdWx0cy5kYXRhLmFib3V0LnRpdGxlICtcIiAtIFwiKyByZXN1bHRzLmRhdGEuYWJvdXQudmVuZG9yO1xyXG5cdFx0fS5iaW5kKHRoaXMpKTtcclxuXHR9XHJcblxyXG5cclxuXHR0aGlzLnN1Ym1pdCA9IGZ1bmN0aW9uKCl7XHJcblx0XHRyZXBvcnRzU2VydmljZS5nZXQodGhpcy5sb2dvblRva2VuLCBmdW5jdGlvbihyZXN1bHRzKXtcclxuXHRcdFx0Y29uc29sZS5sb2cocmVzdWx0cyk7XHJcblx0XHRcdHRoaXMuZm9sZGVyTGlzdCA9IHJlc3VsdHMuZGF0YS5zZWFyY2guZm9sZGVyO1xyXG5cdFx0fS5iaW5kKHRoaXMpKTtcclxuXHR9XHJcblxyXG5cdHRoaXMuZmV0Y2hSZXBvcnRzID0gZnVuY3Rpb24oaWQpe1xyXG5cdFx0cmVwb3J0c1NlcnZpY2UuZ2V0QWxsUmVwb3J0cyh0aGlzLmxvZ29uVG9rZW4sIGlkLCBmdW5jdGlvbihyZXN1bHRzKXtcclxuXHRcdFx0Y29uc29sZS5sb2cocmVzdWx0cyk7XHJcblx0XHRcdHRoaXMucmVwb3J0c0xpc3QgPSByZXN1bHRzLmRhdGEuc2VhcmNoLmRvY3VtZW50O1xyXG5cdFx0fS5iaW5kKHRoaXMpKTtcclxuXHR9XHRcclxuXHJcbn1dKTtcclxuXHJcbnJlcG9ydHNhcHAuc2VydmljZSgncmVwb3J0c1NlcnZpY2UnLCBbJyRodHRwJywgZnVuY3Rpb24oJGh0dHApe1xyXG5cclxuXHR2YXIgYm9lbG9nb24gPSBmdW5jdGlvbihjYil7XHJcblx0XHQkaHR0cCh7XHJcblx0XHRcdG1ldGhvZDogJ0dFVCcsXHJcblx0XHRcdHVybDogJ2h0dHA6Ly9sb2NhbGhvc3Q6ODA4MC9Fc2JpQXBwL3Jlc3QvbG9nb24nXHJcblx0XHR9KVxyXG5cdFx0LnRoZW4oY2IpO1xyXG5cdH07XHJcblxyXG5cdHZhciBib2Vsb2dvZmYgPSBmdW5jdGlvbihjYil7XHJcblx0XHQkaHR0cCh7XHJcblx0XHRcdG1ldGhvZDogJ0dFVCcsXHJcblx0XHRcdHVybDogJ2h0dHA6Ly9sb2NhbGhvc3Q6ODA4MC9Fc2JpQXBwL3Jlc3QvbG9nb2ZmJ1xyXG5cdFx0fSlcclxuXHRcdC50aGVuKGNiKTtcclxuXHR9O1xyXG5cclxuXHR2YXIgYm9lQWJvdXQgPSBmdW5jdGlvbih0b2tlbiwgY2Ipe1xyXG5cdFx0JGh0dHAoe1xyXG5cdFx0XHRtZXRob2Q6ICdHRVQnLFxyXG5cdFx0XHR1cmw6ICdodHRwOi8vbG9jYWxob3N0OjgwODAvRXNiaUFwcC9yZXN0L2Fib3V0LycgKyB0b2tlblxyXG5cdFx0fSlcclxuXHRcdC50aGVuKGNiKTtcclxuXHR9O1xyXG5cclxuXHR2YXIgZ2V0TWFpbiA9IGZ1bmN0aW9uKHRva2VuLCBjYil7XHJcblx0XHQkaHR0cCh7XHJcblx0XHRcdG1ldGhvZDogJ1BPU1QnLFxyXG5cdFx0XHR1cmw6ICdodHRwOi8vbG9jYWxob3N0OjgwODAvRXNiaUFwcC9yZXN0L21haW5mb2xkZXJzLycgKyB0b2tlblxyXG5cdFx0fSlcclxuXHRcdC50aGVuKGNiKTtcclxuXHR9O1xyXG5cclxuXHR2YXIgZ2V0QWxsUmVwb3J0cyA9IGZ1bmN0aW9uKHRva2VuLCBmb2xkZXJJZCwgY2Ipe1xyXG5cdFx0JGh0dHAoe1xyXG5cdFx0XHRtZXRob2Q6ICdQT1NUJyxcclxuXHRcdFx0dXJsOiAnaHR0cDovL2xvY2FsaG9zdDo4MDgwL0VzYmlBcHAvcmVzdC9yZXBvcnRzLycgKyB0b2tlbiArICcvJyArZm9sZGVySWRcclxuXHRcdH0pXHJcblx0XHQudGhlbihjYik7XHJcblx0fTtcclxuXHJcblxyXG5cdHJldHVybntcclxuXHRcdGdldDogZ2V0TWFpbixcclxuXHRcdGJvZWxvZ29uOiBib2Vsb2dvbixcclxuXHRcdGJvZWxvZ29mZjogYm9lbG9nb2ZmLFxyXG5cdFx0Ym9lQWJvdXQ6IGJvZUFib3V0LFxyXG5cdFx0Z2V0QWxsUmVwb3J0czogZ2V0QWxsUmVwb3J0c1xyXG5cclxuXHR9XHJcblx0XHJcbn1dKTsiLCIvKipcclxuKiBzdGF0ZXMgTW9kdWxlXHJcbipcclxuKiBEZXNjcmlwdGlvblxyXG4qL1xyXG5hbmd1bGFyLm1vZHVsZSgnc3RhdGVzJywgW10pXHJcblx0LmNvbnRyb2xsZXIoJ3N0YXRlc0NvbnRyb2xsZXInLCBbJyRzY29wZScsICdzdGF0ZXMnLCBmdW5jdGlvbigkc2NvcGUsIHN0YXRlcyl7XHJcblx0XHRcdCRzY29wZS5zdGF0ZXNDdHJsID0gdGhpcztcclxuXHJcblx0XHRcdHRoaXMubGlzdENvdW50cmllcyA9IGZ1bmN0aW9uKCkge1xyXG5cclxuXHRcdFx0XHRzdGF0ZXMuZ2V0QWxsQ291bnRyaWVzKGZ1bmN0aW9uKHJlc3VsdHMpe1xyXG5cdFx0XHRcdFx0dGhpcy5hbGxjb3VudHJpZXMgPSByZXN1bHRzLmRhdGEuUmVzdFJlc3BvbnNlLnJlc3VsdDtcclxuXHRcdFx0XHRcdGNvbnNvbGUubG9nKHRoaXMuYWxsY291bnRyaWVzKTtcclxuXHRcdFx0XHR9LmJpbmQodGhpcykpO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHR0aGlzLnNlYXJjaCA9IGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRcdC8vYWxlcnQodGhpcy5teXN0YXRlKTtcclxuXHRcdFx0XHRpZih0aGlzLm15c3RhdGUpe1xyXG5cdFx0XHRcdFx0Ly8gZWFybGllciBzdGF0ZXMuZ2V0XHJcblx0XHRcdFx0XHRzdGF0ZXMuZ2V0U3RhdGVzQnlDb3VudHJ5Q29kZSh0aGlzLm15c3RhdGUsIGZ1bmN0aW9uKHJlc3VsdHMpe1xyXG5cclxuXHRcdFx0XHRcdFx0dGhpcy5teXN0YXRlQXJyYXkgPSByZXN1bHRzLmRhdGEuUmVzdFJlc3BvbnNlLnJlc3VsdDtcclxuXHRcdFx0XHRcclxuXHRcdFx0XHRcdH0uYmluZCh0aGlzKSk7XHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRcclxuXHRcdFx0fVxyXG5cclxuXHJcblx0XHRcdC8qdGhpcy5jbGVhciA9IGZ1bmN0aW9uKGV2dCl7XHJcblx0XHRcdFx0dGhpcy5teXN0YXRlID0gJyc7XHJcblxyXG5cdFx0XHR9Ki9cclxuXHJcblx0fV0pXHJcblx0LnNlcnZpY2UoJ3N0YXRlcycsIFsnJGh0dHAnLCBmdW5jdGlvbigkaHR0cCl7XHJcblx0XHRcclxuXHRcdHRoaXMuZ2V0U3RhdGVzQnlDb3VudHJ5Q29kZSA9IGZ1bmN0aW9uKGNvdW50cnlDb2RlLCBjYil7XHJcblx0XHRcdCRodHRwKHtcclxuXHRcdFx0XHRtZXRob2Q6ICdHRVQnLFxyXG5cdFx0XHRcdHVybDogJ2h0dHA6Ly9zZXJ2aWNlcy5ncm91cGt0LmNvbS9zdGF0ZS9nZXQvJyArIGNvdW50cnlDb2RlICsgJy9hbGwnXHJcblx0XHRcdH0pXHJcblx0XHRcdC50aGVuKGNiKTtcclxuXHRcdH07XHJcblxyXG5cdFx0LypyZXR1cm4ge1xyXG5cdFx0XHRnZXQ6IGdldFN0YXRlc0J5Q291bnRyeUNvZGVcclxuXHRcdH0qL1xyXG5cclxuXHRcdHRoaXMuZ2V0QWxsQ291bnRyaWVzID0gZnVuY3Rpb24oY2Ipe1xyXG5cdFx0XHQkaHR0cCh7XHJcblx0XHRcdFx0bWV0aG9kOiAnR0VUJyxcclxuXHRcdFx0XHR1cmw6ICdodHRwOi8vc2VydmljZXMuZ3JvdXBrdC5jb20vY291bnRyeS9nZXQvYWxsJ1xyXG5cdFx0XHR9KVxyXG5cdFx0XHQudGhlbihjYik7XHRcclxuXHJcblx0XHR9O1xyXG5cclxuXHRcdFxyXG5cdH1dKTtcdCIsIi8qKlxyXG4qIHRvZG8gTW9kdWxlXHJcbipcclxuKiBEZXNjcmlwdGlvblxyXG4qL1xyXG5hbmd1bGFyLm1vZHVsZSgndG9kbycsIFtdKVxyXG5cdC5jb250cm9sbGVyKCd0b2RvQ29udHJvbGxlcicsIFsnJHNjb3BlJywgJ3RvZG9Nb2RlbCcsIGZ1bmN0aW9uKCRzY29wZSwgbW9kZWwpe1xyXG5cdFx0JHNjb3BlLnRvZG9DdHJsID0gdGhpcztcclxuXHRcdCRzY29wZS50aXRsZSA9IFwiTXkgbmV3IFByb2dyYW1cIjtcclxuXHJcblx0XHR0aGlzLnRvZG9zID0gbW9kZWwudG9kb3M7XHJcblxyXG5cdFx0dGhpcy5zdWJtaXQgPSBmdW5jdGlvbiBvblN1Ym1pdCgpe1xyXG5cdFx0XHRhbGVydChcIlN1Ym1pdHRlZCFcIisgdGhpcy5uZXdUb2RvKTtcclxuXHRcdFx0dGhpcy50b2Rvcy5wdXNoKHtcclxuXHRcdFx0XHR0ZXh0OiB0aGlzLm5ld1RvZG8sXHJcblx0XHRcdFx0ZWRpdDogZmFsc2VcclxuXHRcdFx0fSlcclxuXHRcdFx0dGhpcy5uZXdUb2RvID0gJyc7XHJcblx0XHR9XHJcblxyXG5cdFx0dGhpcy5lZGl0ID0gZnVuY3Rpb24gb25FZGl0KGlkeCl7XHJcblx0XHRcdHRoaXMudG9kb3NbaWR4XS5lZGl0ID0gIXRoaXMudG9kb3NbaWR4XS5lZGl0XHJcblx0XHR9O1xyXG5cclxuXHRcdHRoaXMuZGVsZXRlID0gZnVuY3Rpb24gb25EZWxldGUoaWR4KXtcclxuXHRcdFx0dGhpcy50b2Rvcy5zcGxpY2UoaWR4LCAxKTtcclxuXHRcdH07XHJcblxyXG5cclxuXHJcblx0XHQkc2NvcGUubmFtZXMgPSBtb2RlbC5uYW1lcztcclxuXHJcblx0XHQkc2NvcGUub25DbGljayA9IGZ1bmN0aW9uICgpe1xyXG5cdFx0XHQkc2NvcGUubmFtZXMucHVzaCgkc2NvcGUuZW50cnlOYW1lKTtcclxuXHRcdH1cclxuXHJcblxyXG5cdFxyXG59XSlcclxuXHQuc2VydmljZSgndG9kb01vZGVsJywgIGZ1bmN0aW9uKCl7XHJcblx0XHRcclxuXHRcdHZhciBuYW1lcyA9IFsnbWFnZ2llJywnem9tYXRvJywncGVya3MnLCdjcmllcyddXHJcblx0XHQvLyByZXR1cm4ge1xyXG5cdFx0Ly8gXHRuYW1lczogbmFtZXNcclxuXHRcdC8vIH1cclxuXHJcblx0XHR2YXIgdG9kb3MgPSBbXTtcclxuXHJcblx0XHRyZXR1cm4ge1xyXG5cdFx0XHR0b2RvczogdG9kb3MsXHJcblx0XHRcdG5hbWVzOiBuYW1lc1xyXG5cdFx0fVxyXG5cdH0pOyJdfQ==
