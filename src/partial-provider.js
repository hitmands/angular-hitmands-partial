/* @ngInject */
function PartialProviderFactory( ) {
   var partials = [];

   function findPartial( idOrUrl ) {
      var res = null;

      for(var i = 0, len = partials.length; i < len; i++) {
         if(partials[i].id === idOrUrl || partials[i].src === idOrUrl) {
            res = partials[i];
         }
      }

      return res;
   }

   var HitmandsPartial = (function() {
      function HitmandsPartial(raw) {
         this.src = raw.src;
         this.id = raw.id;
         this.classes(raw.classes || []);
      }


      HitmandsPartial.prototype.classes = function(newClasses) {
         var classes = ['hm-partial'];
         if(angular.isString(newClasses)) {
            newClasses = [newClasses];
         }

         try {
            classes.push('hm-partial-' + this.id);
         } catch (e) {}

         try {
            classes = classes.concat(newClasses);
         } catch (e) {}

         this.classes = classes;
      };

      return HitmandsPartial;
   }).call(this);

   this.register = function PartialProviderRegisterPartial( newPartial ) {
      if(isArray(newPartial)) {
         for(var i = 0; i < newPartial.length; i++) {
            if(!findPartial(newPartial[i].id)) {
               partials.push( new HitmandsPartial(newPartial[i]) );
            }
         }
      }

      if(angular.isObject(newPartial) && !findPartial(newPartial.id)) {
         partials.push( new HitmandsPartial( newPartial ) );
      }

      return this;
   };

   this.$get = function($exceptionHandler) {

      return {

         get: function( idOrSlug ) {
            if( angular.isUndefined(idOrSlug) ) {
               return partials;
            }
            if( angular.isString(idOrSlug) || angular.isNumber(idOrSlug) ) {
               return findPartial(idOrSlug);
            }

            return null;
         }

      };

   };
}
