'use strict';

var client = angular.module('lelylan.directives.device.services.properties', [])

client.factory('DeviceProperties', ['Device', 'Utils', function(Device, Utils) {

  var service = {};


  /*
   * Update the device properties and and reset of the functions form with
   * the updated values to make consistent the next function execution
   *
   *   DeviceProperties.update(device, properties);
   */

  service.update = function(scope, functionProperties) {
    var properties = filter(functionProperties);
    updateProperties(scope, properties);
    previewProperties(scope, properties);
    scope.device.pending = true;
  };



  /* * * * * *
   * Private *
   * * * * * */

  /*
   * Returns all fields needed to update the device properties
   */

  service.filter = function(properties) {
    return _.map(properties, function(property) {
      return {
        id: property.id,
        pending: property.pending,
        expected: property.expected
      }
    });
  }


  /*
   * Updates the device properties and reset of the functions form
   * with the new values.
   */

  service.updateProperties = function(scope, properties) {
    var device = new Device({ id: scope.device.id, properties: properties});
    device.$properties({}, function() {
      scope.device = device;
      // setFunctionsForms();
    });
  }


  /*
   * Updates the device properties with the new values although
   * the success callback is not fired yet (optimistic).
   */

  service.previewProperties = function(scope, properties) {
    _.each(scope.device.properties, function(resource) {
      var property = Utils.getResource(resource.id, properties)
      resource.pending  = property.pending;
      resource.expected = property.expected;
    });
  }


  return service;
}]);
