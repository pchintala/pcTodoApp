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