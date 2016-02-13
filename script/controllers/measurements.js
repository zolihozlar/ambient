(function() {
  'use strict';

  app.controller('measurementsCtrl', function(socket, $interval) {
    // var socket = io.connect();
    var vm = this;

    // ask for data every 1 second
    $interval(ping, 1000);

    function ping() {
      // vm.location.reload();
    };

    socket.on('measurements', function(data) {
      vm.dataOutput = data;

      var chart = c3.generate({
        data: {
          json: vm.dataOutput,
          keys: {
            value: ['random']
          }
        },
        axis: {
          x: {
            type: 'random'
          },
          y: {
            min: 0,
            max: 2000000000
          }
        }
      });
    });
  });
}());
