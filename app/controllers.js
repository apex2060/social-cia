var MainCtrl = app.controller('MainCtrl', function($rootScope, $scope, $routeParams, config, userService){
	$rootScope.rp = $routeParams;
	$rootScope.config = config;

	var Tag = Parse.Object.extend('Tag');

	var rootTools = {
		user: userService,
		url:function(){
			var whitelist = ['home','about','tos','signup','login']
			// if(!$rootScope.user)
			// 	if(whitelist.indexOf($routeParams.view) == -1)
			// 		return 'views/login.html';

			if(!$routeParams.module)
				return 'views/'+$routeParams.view+'.html';
			else if(!$routeParams.view)
				return 'modules/'+$routeParams.module+'/main.html';
			else
				return 'modules/'+$routeParams.module+'/'+$routeParams.view+'/main.html';
		},
		init:function(){
			if(!$rootScope.temp){
				$rootScope.status = 'insecure';//locked//secure
				$rootScope.alerts = [];
				$rootScope.temp = {};
				userService.user().then(function(){
					//Do things than need to be done once the user is authenticated.
					// family.init();
					// tag.init();
				});
				$scope.$on('$viewContentLoaded', function(event) {
					// ga('send', 'pageview', $location.path());
				});
			}
		},
		alert:{
			add:function(type, message){
				var alert = {
					type: 'alert-'+type,
					message: message
				}
				$rootScope.alerts.push(alert)
				return alert;
			},
			dismiss:function(alert){
				var alertIndex = $rootScope.alerts.indexOf(alert);
				if(alertIndex != -1)
					$rootScope.alerts.splice(alertIndex, 1);
			}
		},
		status: function(status){
			if(status)
				$rootScope.status = status;
		}
	}
	$rootScope.alert = rootTools.alert.add;
	$rootScope.rootTools = rootTools;
	rootTools.init();
	it.MainCtrl=$scope;
});