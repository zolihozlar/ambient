(function() {
  'use strict';

  app.controller('measurementsCtrl', function(socket, $interval) {
    var vm = this;

    socket.on('measurements', function(data) {
      vm.dataOutput = data;

      var chart = c3.generate({
        data: {
          json: vm.dataOutput,
          keys: {
            value: ['Temperature', 'Humidity', 'Light', 'Moisture']
          }
        },
        axis: {
          // x: {
          //   type: 'temperature'
          // },
          y: {
            min: 0,
            // max: 2000000000
          }
        }
      });
    });
  });
}());
