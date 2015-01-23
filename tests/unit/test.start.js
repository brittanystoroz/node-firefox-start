'use strict';

// Unit tests for the operating-system specific parsers.
// No need to run them on actual environments per se, as we are checking for
// the correctly returned type, and using test data already, etc.


var StartSimulator = require('../../');
var Promise = require('es6-promise').Promise;


module.exports = {

  // shouldFindAndReturnFirstSimulator: function(test) {
  //   var simulator = findSimulator({ port: 8002 });
  //   console.log("Simulator: ", simulator);

  // },

  shouldStartSimulator: function(test) {
    test.expect(2);

    new StartSimulator()
    .then(function(sim) {
      console.log("SIM: ", sim);
      process.kill(sim.pid);
      test.equals(typeof sim.pid, 'number', 'Simulator pid is a number');
      test.equals(typeof sim.port, 'number', 'Simulator port is a number');
    }).done(function() {
      test.done();
    });
  },

  shouldMatchGivenRelease: function(test) {
    test.expect(1);
      new Start({ release: ['2.1'] })
      .then(function(sim) {
        process.kill(sim.pid);
        test.equals(sim.release, '2.1', 'Simulator release is 2.1');
      }).done(function() {
        test.done();
      });
  },

  shouldMatchGivenPort: function(test) {
    test.expect(1);
    new Start({ port: 8081 })
      .then(function(sim) {
        process.kill(sim.pid);
        test.equals(sim.port, 8081, 'Simulator port is 8081');
      }).done(function() {
        test.done();
      });
  },

  shouldForceStart: function(test) {
    var first = Start({
      force: true,
      port: 8081
    }).fail(done);

    var second = first.then(function(sim) {
      return Start({force:true, port:8082});
    }).fail(done);

    Q.all([first, second])
      .spread(function(sim1, sim2) {
        sim2.pid.should.not.equal(sim1.pid);
        sim2.port.should.equal(8082);
        process.kill(sim2.pid);
        
      })
      .then(done)
      .fail(done); 
  }
};
