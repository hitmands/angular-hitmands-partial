/* @ngInject */
function PartialDirectiveFactory(PartialService, $exceptionHandler) {
   return {
      scope: false,
      restrict: 'E',
      templateUrl: function(tEl, tAttrs) {
         var _id = tEl.attr('data-hm-partial-id') || tEl.attr('id');
         var partial = PartialService.get( _id );

         try {
            tAttrs.$addClass(partial.classes);
         } catch (e) {}

         if(!partial.hasOwnProperty('src') || !partial.src.length) {
            $exceptionHandler('hitmands.partial, Partial Not Correctly Registered');
            return;
         }

         try {
            tEl.attr('data-hm-partial-src', partial.src);
         } catch (e) {}

         return partial.src;
      }
   };
}
