/**
* todoApp Module
*
* Description
*/
angular.module('todoApp', [
	'ui.router', 
	'todo',
	'states'
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
		;
});


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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyIsInRvZG8vdG9kby1tb2R1bGUuanMiLCJzdGF0ZXMvc3RhdGVzLW1vZHVsZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDNUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3JEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoic2NyaXB0cy5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxyXG4qIHRvZG9BcHAgTW9kdWxlXHJcbipcclxuKiBEZXNjcmlwdGlvblxyXG4qL1xyXG5hbmd1bGFyLm1vZHVsZSgndG9kb0FwcCcsIFtcclxuXHQndWkucm91dGVyJywgXHJcblx0J3RvZG8nLFxyXG5cdCdzdGF0ZXMnXHJcbl0pXHJcbi5jb25maWcoZnVuY3Rpb24oJHN0YXRlUHJvdmlkZXIsICR1cmxSb3V0ZXJQcm92aWRlcil7XHJcblx0dmFyIGJhc2VQYXRoID0gJ3NyYy9hcHAvJztcclxuXHJcblx0JHVybFJvdXRlclByb3ZpZGVyLm90aGVyd2lzZSgnLycpO1xyXG5cdCRzdGF0ZVByb3ZpZGVyXHJcblx0XHQuc3RhdGUoJ3RvZG8nLHtcclxuXHRcdFx0dXJsOiAnLycsXHJcblx0XHRcdHRlbXBsYXRlVXJsOiBiYXNlUGF0aCArICd0b2RvL3RvZG8uaHRtbCcsXHJcblx0XHRcdGNvbnRyb2xsZXI6ICd0b2RvQ29udHJvbGxlciBhcyB0b2RvQ3RybCdcclxuXHRcdH0pXHJcblx0XHQuc3RhdGUoJ3N0YXRlcycse1xyXG5cdFx0XHR1cmw6ICcvc3RhdGVzJyxcclxuXHRcdFx0dGVtcGxhdGVVcmw6IGJhc2VQYXRoICsgJy9zdGF0ZXMvc3RhdGVzLmh0bWwnLFxyXG5cdFx0XHRjb250cm9sbGVyOiAnc3RhdGVzQ29udHJvbGxlciBhcyBzdGF0ZXNDdHJsJ1xyXG5cdFx0fSlcclxuXHRcdDtcclxufSk7XHJcblxyXG4iLCIvKipcclxuKiB0b2RvIE1vZHVsZVxyXG4qXHJcbiogRGVzY3JpcHRpb25cclxuKi9cclxuYW5ndWxhci5tb2R1bGUoJ3RvZG8nLCBbXSlcclxuXHQuY29udHJvbGxlcigndG9kb0NvbnRyb2xsZXInLCBbJyRzY29wZScsICd0b2RvTW9kZWwnLCBmdW5jdGlvbigkc2NvcGUsIG1vZGVsKXtcclxuXHRcdCRzY29wZS50b2RvQ3RybCA9IHRoaXM7XHJcblx0XHQkc2NvcGUudGl0bGUgPSBcIk15IG5ldyBQcm9ncmFtXCI7XHJcblxyXG5cdFx0dGhpcy50b2RvcyA9IG1vZGVsLnRvZG9zO1xyXG5cclxuXHRcdHRoaXMuc3VibWl0ID0gZnVuY3Rpb24gb25TdWJtaXQoKXtcclxuXHRcdFx0YWxlcnQoXCJTdWJtaXR0ZWQhXCIrIHRoaXMubmV3VG9kbyk7XHJcblx0XHRcdHRoaXMudG9kb3MucHVzaCh7XHJcblx0XHRcdFx0dGV4dDogdGhpcy5uZXdUb2RvLFxyXG5cdFx0XHRcdGVkaXQ6IGZhbHNlXHJcblx0XHRcdH0pXHJcblx0XHRcdHRoaXMubmV3VG9kbyA9ICcnO1xyXG5cdFx0fVxyXG5cclxuXHRcdHRoaXMuZWRpdCA9IGZ1bmN0aW9uIG9uRWRpdChpZHgpe1xyXG5cdFx0XHR0aGlzLnRvZG9zW2lkeF0uZWRpdCA9ICF0aGlzLnRvZG9zW2lkeF0uZWRpdFxyXG5cdFx0fTtcclxuXHJcblx0XHR0aGlzLmRlbGV0ZSA9IGZ1bmN0aW9uIG9uRGVsZXRlKGlkeCl7XHJcblx0XHRcdHRoaXMudG9kb3Muc3BsaWNlKGlkeCwgMSk7XHJcblx0XHR9O1xyXG5cclxuXHJcblxyXG5cdFx0JHNjb3BlLm5hbWVzID0gbW9kZWwubmFtZXM7XHJcblxyXG5cdFx0JHNjb3BlLm9uQ2xpY2sgPSBmdW5jdGlvbiAoKXtcclxuXHRcdFx0JHNjb3BlLm5hbWVzLnB1c2goJHNjb3BlLmVudHJ5TmFtZSk7XHJcblx0XHR9XHJcblxyXG5cclxuXHRcclxufV0pXHJcblx0LnNlcnZpY2UoJ3RvZG9Nb2RlbCcsICBmdW5jdGlvbigpe1xyXG5cdFx0XHJcblx0XHR2YXIgbmFtZXMgPSBbJ21hZ2dpZScsJ3pvbWF0bycsJ3BlcmtzJywnY3JpZXMnXVxyXG5cdFx0Ly8gcmV0dXJuIHtcclxuXHRcdC8vIFx0bmFtZXM6IG5hbWVzXHJcblx0XHQvLyB9XHJcblxyXG5cdFx0dmFyIHRvZG9zID0gW107XHJcblxyXG5cdFx0cmV0dXJuIHtcclxuXHRcdFx0dG9kb3M6IHRvZG9zLFxyXG5cdFx0XHRuYW1lczogbmFtZXNcclxuXHRcdH1cclxuXHR9KTsiLCIvKipcclxuKiBzdGF0ZXMgTW9kdWxlXHJcbipcclxuKiBEZXNjcmlwdGlvblxyXG4qL1xyXG5hbmd1bGFyLm1vZHVsZSgnc3RhdGVzJywgW10pXHJcblx0LmNvbnRyb2xsZXIoJ3N0YXRlc0NvbnRyb2xsZXInLCBbJyRzY29wZScsICdzdGF0ZXMnLCBmdW5jdGlvbigkc2NvcGUsIHN0YXRlcyl7XHJcblx0XHRcdCRzY29wZS5zdGF0ZXNDdHJsID0gdGhpcztcclxuXHJcblx0XHRcdHRoaXMubGlzdENvdW50cmllcyA9IGZ1bmN0aW9uKCkge1xyXG5cclxuXHRcdFx0XHRzdGF0ZXMuZ2V0QWxsQ291bnRyaWVzKGZ1bmN0aW9uKHJlc3VsdHMpe1xyXG5cdFx0XHRcdFx0dGhpcy5hbGxjb3VudHJpZXMgPSByZXN1bHRzLmRhdGEuUmVzdFJlc3BvbnNlLnJlc3VsdDtcclxuXHRcdFx0XHRcdGNvbnNvbGUubG9nKHRoaXMuYWxsY291bnRyaWVzKTtcclxuXHRcdFx0XHR9LmJpbmQodGhpcykpO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHR0aGlzLnNlYXJjaCA9IGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRcdC8vYWxlcnQodGhpcy5teXN0YXRlKTtcclxuXHRcdFx0XHRpZih0aGlzLm15c3RhdGUpe1xyXG5cdFx0XHRcdFx0Ly8gZWFybGllciBzdGF0ZXMuZ2V0XHJcblx0XHRcdFx0XHRzdGF0ZXMuZ2V0U3RhdGVzQnlDb3VudHJ5Q29kZSh0aGlzLm15c3RhdGUsIGZ1bmN0aW9uKHJlc3VsdHMpe1xyXG5cclxuXHRcdFx0XHRcdFx0dGhpcy5teXN0YXRlQXJyYXkgPSByZXN1bHRzLmRhdGEuUmVzdFJlc3BvbnNlLnJlc3VsdDtcclxuXHRcdFx0XHRcclxuXHRcdFx0XHRcdH0uYmluZCh0aGlzKSk7XHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRcclxuXHRcdFx0fVxyXG5cclxuXHJcblx0XHRcdC8qdGhpcy5jbGVhciA9IGZ1bmN0aW9uKGV2dCl7XHJcblx0XHRcdFx0dGhpcy5teXN0YXRlID0gJyc7XHJcblxyXG5cdFx0XHR9Ki9cclxuXHJcblx0fV0pXHJcblx0LnNlcnZpY2UoJ3N0YXRlcycsIFsnJGh0dHAnLCBmdW5jdGlvbigkaHR0cCl7XHJcblx0XHRcclxuXHRcdHRoaXMuZ2V0U3RhdGVzQnlDb3VudHJ5Q29kZSA9IGZ1bmN0aW9uKGNvdW50cnlDb2RlLCBjYil7XHJcblx0XHRcdCRodHRwKHtcclxuXHRcdFx0XHRtZXRob2Q6ICdHRVQnLFxyXG5cdFx0XHRcdHVybDogJ2h0dHA6Ly9zZXJ2aWNlcy5ncm91cGt0LmNvbS9zdGF0ZS9nZXQvJyArIGNvdW50cnlDb2RlICsgJy9hbGwnXHJcblx0XHRcdH0pXHJcblx0XHRcdC50aGVuKGNiKTtcclxuXHRcdH07XHJcblxyXG5cdFx0LypyZXR1cm4ge1xyXG5cdFx0XHRnZXQ6IGdldFN0YXRlc0J5Q291bnRyeUNvZGVcclxuXHRcdH0qL1xyXG5cclxuXHRcdHRoaXMuZ2V0QWxsQ291bnRyaWVzID0gZnVuY3Rpb24oY2Ipe1xyXG5cdFx0XHQkaHR0cCh7XHJcblx0XHRcdFx0bWV0aG9kOiAnR0VUJyxcclxuXHRcdFx0XHR1cmw6ICdodHRwOi8vc2VydmljZXMuZ3JvdXBrdC5jb20vY291bnRyeS9nZXQvYWxsJ1xyXG5cdFx0XHR9KVxyXG5cdFx0XHQudGhlbihjYik7XHRcclxuXHJcblx0XHR9O1xyXG5cclxuXHRcdFxyXG5cdH1dKTtcdCJdfQ==
