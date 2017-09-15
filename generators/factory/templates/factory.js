'use strict';

/**
 * @ngdoc function
 * @name <%= scriptAppName %>.<%= classedName %>
 * @description
 * # <%= classedName %>
 * Factory in the <%= scriptAppName %>
 */
angular.module('<%= scriptAppName %>')
  .factory('<%= classedName %>', function () {
  	// Service logic
    // ...

    var meaningOfLife = 42;

    // Public API here
    return {
      someMethod: function () {
        return meaningOfLife;
      }
    };
  });
