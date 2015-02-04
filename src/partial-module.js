/**
 * @ngdoc module
 * @name hitmands.partial
 * @module hitmands.partial
 **/

angular
   .module('hitmands.partial', [])
   .provider('PartialService', PartialProviderFactory)
   .directive('hmPartial', PartialDirectiveFactory)
;
