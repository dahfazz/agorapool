

var fake = {
    'name': 'Ma piscine à boule',
    'zipCode': 75009,
    'adress': '21, Jump Street',
    'id': 000,
    'description': 'La meilleure piscine du Monde',
    'phone': '0142589874',
    'calendars': {
        '2014-10-24': [
            [
                '11:00:00',
                '23:00:00'
            ]
        ]
    },
    'lon': 48.7,
    'lat': 2.356
}

angular.module('myControllers', [])

    .controller('AppCtrl', ['$scope', '$rootScope', function($scope, $rootScope) {
        
        $rootScope.loading = true;
        $rootScope.home    = false;

        $scope.zipcodes = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', 
        '20']
    }])


    .controller('ListCtrl', ['$scope', 'apiService', '$rootScope', '$location', function($scope, apiService, $rootScope, $location) {

        $rootScope.home    = true;

        if ($scope.pools) return;
        apiService.pools().then(function(response) {
            $scope.pools = response.data;

            $scope.pools.push(fake);

            $rootScope.loading = false;
        });


        $scope.open = function(event, id) {
            event.preventDefault();
            $location.path('/pool/' + id);
            $rootScope.loading = true;
        }
    }])


    .controller('PoolCtrl', ['$scope', '$routeParams', 'Restangular', 'apiService', '$rootScope', 'geoService', function($scope, $routeParams, Restangular, apiService, $rootScope, geoService) {

        $rootScope.home    = false;

        if ($routeParams.id == '0') {
            $scope.pool = {
                'name': 'Ma piscine à boules',

            }
            $rootScope.loading = false;
        }

        if ($routeParams.id == '0') {
            $scope.pool = fake;
            $rootScope.loading = false;

            $scope.isOpen = true;

            $scope.distance = 2;
            $scope.crowd_level = 1;
            $scope.from = '11:00';
            $scope.until = '23:00';
            $rootScope.loading = false;

            $scope.tomorrowFrom = "Dimanche ?!!";
            $scope.tomorrowUntil = "Fermé";

            return;
        }

        apiService.pool($routeParams.id).then(function(response) {
            $scope.pool = response.data[0];

            console.log($scope.pool)

            var today = $scope.pool.calendars['2014-10-24'][0];
            $scope.from = today[0];
            $scope.until = today[1];

            var tomorrow = $scope.pool.calendars['2014-10-25'][0];
            $scope.tomorrowFrom = tomorrow[0];
            $scope.tomorrowUntil = tomorrow[1];

            var fromH  = parseInt(today[0].substr(0,2)),
                untilH = parseInt(today[1].substr(0,2));

            var d = new Date();
            var h = d.getHours();
            var m = d.getMinutes();

            $scope.isOpen = (h >= fromH && h< untilH)


            apiService.affluence($scope.pool.idequipements).then(function(response) {
                //$scope.crowd_level = response.data.crowd_level;
            });

            /*TODO: remove this FAKE data */
            $scope.crowd_level = Math.floor(Math.random() * 3) + 1;

            if (!$scope.isOpen) $scope.crowd_level = 0;

            $rootScope.loading = false;


            $scope.distance = geoService.distanceTo($scope.pool.lat, $scope.pool.lon);
        });
    }])
;