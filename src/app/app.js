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

