

var TOKEN = '8ff1038759e0f9c36d463274226bb5d4a241a985f9ceae6e33b3f88bc454d08c';


angular.module('myServices', ['restangular'])
    .factory('apiService', ['Restangular', function(Restangular){

        var BREAKPOINT = Restangular.one('Equipements');

        return {
            pools: function() {
                return BREAKPOINT.customGET('get_equipements', {
                    'token': TOKEN,
                    'cid': '27,29',
                    'offset': 1,
                    'limit': 500
                });
            },

            pool: function(id) {
                return BREAKPOINT.customGET('get_equipement', {
                    'token': TOKEN,
                    'id': id
                });
            },

            affluence: function(id) {
                return BREAKPOINT.customGET('get_crowd_level', {
                    'token': TOKEN,
                    'id': id
                });
            }
        }
    }])

    .factory('geoService', [function(){

        var hoteldeville = {
            'lat': 48.8566140,
            'lon': 2.3522220
            
        };

        return {
            rad: function(x) { return x * Math.PI / 180 },

            // Distance in kilometers between two points using the Haversine algo.
            distanceTo: function(lat2, lon2) {
                var R = 6371
                var dLat  = this.rad(lat2 - hoteldeville.lat)
                var dLong = this.rad(lon2 - hoteldeville.lon)

                var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
                Math.cos(this.rad(hoteldeville.lat)) * Math.cos(this.rad(lat2)) * Math.sin(dLong/2) * Math.sin(dLong/2)
                var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a))
                var d = R * c

                return Math.round(d)
            }
        }
    }])