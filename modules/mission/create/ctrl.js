var MissionCreateCtrl = app.lazy.controller('MissionCreateCtrl', function($rootScope, $scope, $routeParams, $q, config, userService, fileService){
	$scope.path = function(target){
		return '/modules/mission/create/partials/'+target+'.html';
	}
	$scope.activities = [
		{
			objectId: '87f9a89uaw',
			title: 'Ice Blocking',
		},
		{
			objectId: 'f8a938a0a',
			title: 'Scavenger'
		}
	]

	var tools = {
		init:function(){
			if(localStorage.mission){
				var mission 				= angular.fromJson(localStorage.mission);
				mission.friend.birthday 	= new Date(mission.friend.birthday);
				mission.activity.choice 	= $scope.activities.find('objectId', mission.activity.choice.objectId);
				mission.activity.date 		= new Date(mission.activity.date);
				mission.activity.time 		= new Date(mission.activity.time);
				$scope.mission 				= mission;
			}
		},
		mission:{
			save:function(step, mission){
				localStorage.setItem('mission',angular.toJson(mission))
				if(step == 'friend')
					$('#missionTabs li:eq(1) a').tab('show')
				else if(step == 'user')
					$('#missionTabs li:eq(2) a').tab('show')
				else
					return; // Preview mission
			}
		},
		cropPic:function(){
			require(['assets/js/crop'], function(){
				var jcrop_api;
				var bounds, boundx, boundy;
				$('#friendPicProfile').Jcrop({
					onChange: showPreview,
					onSelect: showPreview,
					aspectRatio: 1
				},function(){
					jcrop_api = this;
					bounds = jcrop_api.getBounds();
					boundx = bounds[0];
					boundy = bounds[1];
				});
				function showPreview(coords){
					console.log(coords)
					// if (parseInt(coords.w) > 0){
					// 	var rx = 100 / coords.w;
					// 	var ry = 100 / coords.h;

					// 	$('#preview').css({
					// 		width: Math.round(rx * boundx) + 'px',
					// 		height: Math.round(ry * boundy) + 'px',
					// 		marginLeft: '-' + Math.round(rx * coords.x) + 'px',
					// 		marginTop: '-' + Math.round(ry * coords.y) + 'px'
					// 	});
					// }
				};
			});
		},
		uploadPic:function(details, src){
			var deferred = $q.defer();
			deferred.notify({
				temp: true,
				status: 'uploading',
				class: 'grayscale',
				name: 'Image Uploading...',
				src: src
			});

			fileService.upload(details,src).then(function(data){
				deferred.resolve({
					name: data.name(),
					src: data.url()
				})
			});
			return deferred.promise;
		},
		friend: {
			picProfile: function(dtls, src){
				var details = angular.copy(dtls)
				details.name = 'friendProfile';
				tools.uploadPic(details, src).then(function(img){
					$scope.mission.friend.picProfile = img;
				}, function(error){
					alert(error)
				}, function(update){
					$scope.mission.friend.picProfile = img;
				});
			},
			picGeneral: function(dtls, src){
				var details = angular.copy(dtls)
				details.name = 'friendGeneral';
				tools.uploadPic(details, src).then(function(img){
					$scope.mission.friend.picGeneral = img;
				}, function(error){
					alert(error)
				}, function(update){
					$scope.mission.friend.picGeneral = img;
				});
			}
		},
		user: {
			picProfile: function(dtls, src){
				var details = angular.copy(dtls)
				details.name = 'userProfile';
				tools.uploadPic(details, src).then(function(img){
					$scope.mission.user.picProfile = img;
				}, function(error){
					alert(error)
				}, function(update){
					$scope.mission.user.picProfile = img;
				});
			},
			picGeneral: function(dtls, src){
				var details = angular.copy(dtls)
				details.name = 'userGeneral';
				tools.uploadPic(details, src).then(function(img){
					$scope.mission.user.picGeneral = img;
				}, function(error){
					alert(error)
				}, function(update){
					$scope.mission.user.picGeneral = img;
				});
			}
		}
	}

	$scope.tools = tools;
	tools.init();
	it.MissionCreateCtrl=$scope;
});