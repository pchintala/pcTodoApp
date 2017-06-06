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