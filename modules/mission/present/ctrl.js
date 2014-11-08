var MissionPresentCtrl = app.lazy.controller('MissionPresentCtrl', function($rootScope, $scope, $http, $routeParams, $q, config, userService){
	
	$scope.path = function(target){
		return '/modules/mission/present/partials/'+target+'.html';
	}
	var tools = {
		init:function(){
			if(localStorage.mission){
				var mission 				= angular.fromJson(localStorage.mission);
				mission.friend.birthday 	= new Date(mission.friend.birthday);
				mission.activity.date 		= new Date(mission.activity.date);
				mission.activity.time 		= new Date(mission.activity.time);
				$scope.mission 				= mission;
			}
			tools.process.begin();
			/*
				Get mission details using token (from the URL)
				Request Permissions (Geolocation & Camera)
				- Take picture and find match
				- Call User
				- Zoom Map
				- Secure Connection
				- Transmit Mission
				- Lock
				==
				- Pictures
				- Text
				- Map
				- Street View
			*/
		},
		view:function(){
			return '/modules/mission/present/partials/setup.html';
		},
		say:function(message){
			var msg = new SpeechSynthesisUtterance(message);
    		window.speechSynthesis.speak(msg);
		},
		getCredentials:function(){
			//Get User Media
			navigator.webkitGetUserMedia({video: true, audio: true}, function(localMediaStream) {
				var video = document.querySelector('video');
				video.autoplay = true;
				video.volume = 0;
				video.src = window.URL.createObjectURL(localMediaStream);
				$scope.video = video;
				$scope.localMediaStream = localMediaStream;
			}, function(e){
				console.log('Video Rejected!', e);
			});

			//Get User Location
			if (navigator.geolocation) {
				navigator.geolocation.getCurrentPosition(function(position){
					$scope.$apply(function(){
						$scope.position = position;
					});
				}, function(e){
					console.log('Position Rejected!', e);
				});
			} else {
				console.log('Position not available.');
			}
		},
		process: {
			begin:function(){
				tools.process.setup();
			},
			setup:function(){
				tools.getCredentials();
			},
			takePicture:function(){

			}
		},
		video:{
			pause: function(){
				$scope.video.pause();
			}
		},
		map:{
			get:function(coords){
				if(coords)
					return 'http://maps.googleapis.com/maps/api/staticmap?center='+coords.latitude+','+coords.longitude+'&zoom=14&size=400x400&sensor=false';
			}
		}
	}

	$scope.tools = tools;
	tools.init();
	it.MissionPresentCtrl=$scope;
});