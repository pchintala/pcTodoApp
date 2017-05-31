/**
* todoApp Module
*
* Description
*/
angular.module('todoApp', [
	'ui.router', 
	'todo'
])
.config(function($stateProvider, $urlRouterProvider){
	var basePath = 'src/app/';

	$urlRouterProvider.otherwise('/');
	$stateProvider
		.state('todo',{
			url: '/',
			templateUrl: basePath + 'todo/todo.html',
			controller: 'todoController as todoCtrl'
		});
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
			//alert("Submitted!");
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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyIsInRvZG8vdG9kby1tb2R1bGUuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ25CQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoic2NyaXB0cy5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxyXG4qIHRvZG9BcHAgTW9kdWxlXHJcbipcclxuKiBEZXNjcmlwdGlvblxyXG4qL1xyXG5hbmd1bGFyLm1vZHVsZSgndG9kb0FwcCcsIFtcclxuXHQndWkucm91dGVyJywgXHJcblx0J3RvZG8nXHJcbl0pXHJcbi5jb25maWcoZnVuY3Rpb24oJHN0YXRlUHJvdmlkZXIsICR1cmxSb3V0ZXJQcm92aWRlcil7XHJcblx0dmFyIGJhc2VQYXRoID0gJ3NyYy9hcHAvJztcclxuXHJcblx0JHVybFJvdXRlclByb3ZpZGVyLm90aGVyd2lzZSgnLycpO1xyXG5cdCRzdGF0ZVByb3ZpZGVyXHJcblx0XHQuc3RhdGUoJ3RvZG8nLHtcclxuXHRcdFx0dXJsOiAnLycsXHJcblx0XHRcdHRlbXBsYXRlVXJsOiBiYXNlUGF0aCArICd0b2RvL3RvZG8uaHRtbCcsXHJcblx0XHRcdGNvbnRyb2xsZXI6ICd0b2RvQ29udHJvbGxlciBhcyB0b2RvQ3RybCdcclxuXHRcdH0pO1xyXG59KTsiLCIvKipcclxuKiB0b2RvIE1vZHVsZVxyXG4qXHJcbiogRGVzY3JpcHRpb25cclxuKi9cclxuYW5ndWxhci5tb2R1bGUoJ3RvZG8nLCBbXSlcclxuXHQuY29udHJvbGxlcigndG9kb0NvbnRyb2xsZXInLCBbJyRzY29wZScsICd0b2RvTW9kZWwnLCBmdW5jdGlvbigkc2NvcGUsIG1vZGVsKXtcclxuXHRcdCRzY29wZS50b2RvQ3RybCA9IHRoaXM7XHJcblx0XHQkc2NvcGUudGl0bGUgPSBcIk15IG5ldyBQcm9ncmFtXCI7XHJcblxyXG5cdFx0dGhpcy50b2RvcyA9IG1vZGVsLnRvZG9zO1xyXG5cclxuXHRcdHRoaXMuc3VibWl0ID0gZnVuY3Rpb24gb25TdWJtaXQoKXtcclxuXHRcdFx0Ly9hbGVydChcIlN1Ym1pdHRlZCFcIik7XHJcblx0XHRcdHRoaXMudG9kb3MucHVzaCh7XHJcblx0XHRcdFx0dGV4dDogdGhpcy5uZXdUb2RvLFxyXG5cdFx0XHRcdGVkaXQ6IGZhbHNlXHJcblx0XHRcdH0pXHJcblx0XHRcdHRoaXMubmV3VG9kbyA9ICcnO1xyXG5cdFx0fVxyXG5cclxuXHRcdHRoaXMuZWRpdCA9IGZ1bmN0aW9uIG9uRWRpdChpZHgpe1xyXG5cdFx0XHR0aGlzLnRvZG9zW2lkeF0uZWRpdCA9ICF0aGlzLnRvZG9zW2lkeF0uZWRpdFxyXG5cdFx0fTtcclxuXHJcblx0XHR0aGlzLmRlbGV0ZSA9IGZ1bmN0aW9uIG9uRGVsZXRlKGlkeCl7XHJcblx0XHRcdHRoaXMudG9kb3Muc3BsaWNlKGlkeCwgMSk7XHJcblx0XHR9O1xyXG5cclxuXHJcblxyXG5cdFx0JHNjb3BlLm5hbWVzID0gbW9kZWwubmFtZXM7XHJcblxyXG5cdFx0JHNjb3BlLm9uQ2xpY2sgPSBmdW5jdGlvbiAoKXtcclxuXHRcdFx0JHNjb3BlLm5hbWVzLnB1c2goJHNjb3BlLmVudHJ5TmFtZSk7XHJcblx0XHR9XHJcblxyXG5cclxuXHRcclxufV0pXHJcblx0LnNlcnZpY2UoJ3RvZG9Nb2RlbCcsICBmdW5jdGlvbigpe1xyXG5cdFx0XHJcblx0XHR2YXIgbmFtZXMgPSBbJ21hZ2dpZScsJ3pvbWF0bycsJ3BlcmtzJywnY3JpZXMnXVxyXG5cdFx0Ly8gcmV0dXJuIHtcclxuXHRcdC8vIFx0bmFtZXM6IG5hbWVzXHJcblx0XHQvLyB9XHJcblxyXG5cdFx0dmFyIHRvZG9zID0gW107XHJcblxyXG5cdFx0cmV0dXJuIHtcclxuXHRcdFx0dG9kb3M6IHRvZG9zLFxyXG5cdFx0XHRuYW1lczogbmFtZXNcclxuXHRcdH1cclxuXHR9KTsiXX0=
