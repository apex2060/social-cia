app.factory('config', function ($rootScope, $http) {
	var config = {
		parseRoot: 			'https://api.parse.com/1/',
	 	parseAppId: 		'94tJyTcIoMqFlUGS5PG4kdOSKx6MPEbejUgq4YXY',
	 	parseJsKey: 		'GsOh7dAOok1DzdTxpIayXlkDe2Id93OMlVnIP7RQ',
	 	parseRestApiKey: 	'uzQw3EsNj5DGgkdy2ruDMuggVU2yV6bBhpoSxXTa',
	 	googleApiKey: 		'AIzaSyCdziJUzU0g7gUs3T-b3YBX1CipHwQybSM',
	};

	Parse.initialize(config.parseAppId, config.parseJsKey);
	$http.defaults.headers.common['X-Parse-Application-Id'] = config.parseAppId;
	$http.defaults.headers.common['X-Parse-REST-API-Key'] = config.parseRestApiKey;
	$http.defaults.headers.common['Content-Type'] = 'application/json';

	return config;
});