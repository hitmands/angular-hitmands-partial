/**!
 * @Project: angular-hitmands-partial
 * @Authors: Giuseppe Mandato <gius.mand.developer@gmail.com>
 * @Link: https://github.com/hitmands/angular-hitmands-partial
 * @License: MIT
 * @Date: 2015-02-04
 * @Version: 1.0.0
***/

(function(window, angular) {
   'use strict';

   /* @ngInject */
   function PartialProviderFactory() {
      function findPartial(idOrUrl) {
         for (var res = null, i = 0, len = partials.length; len > i; i++) {
            (partials[i].id === idOrUrl || partials[i].src === idOrUrl) && (res = partials[i]);
         }
         return res;
      }
      var partials = [], HitmandsPartial = function() {
         function HitmandsPartial(raw) {
            this.src = raw.src;
            this.id = raw.id;
            this.classes(raw.classes || []);
         }
         HitmandsPartial.prototype.classes = function(newClasses) {
            var classes = [ "hm-partial" ];
            angular.isString(newClasses) && (newClasses = [ newClasses ]);
            try {
               classes.push("hm-partial-" + this.id);
            } catch (e) {}
            try {
               classes = classes.concat(newClasses);
            } catch (e) {}
            this.classes = classes;
         };
         return HitmandsPartial;
      }.call(this);
      this.register = function(newPartial) {
         if (isArray(newPartial)) {
            for (var i = 0; i < newPartial.length; i++) {
               findPartial(newPartial[i].id) || partials.push(new HitmandsPartial(newPartial[i]));
            }
         }
         angular.isObject(newPartial) && !findPartial(newPartial.id) && partials.push(new HitmandsPartial(newPartial));
         return this;
      };
      this.$get = function() {
         return {
            "get": function(idOrSlug) {
               return angular.isUndefined(idOrSlug) ? partials : angular.isString(idOrSlug) || angular.isNumber(idOrSlug) ? findPartial(idOrSlug) : null;
            }
         };
      };
   }

   /* @ngInject */
   function PartialDirectiveFactory(PartialService, $exceptionHandler) {
      return {
         "scope": !1,
         "restrict": "E",
         "priority": 1e7,
         "templateUrl": function(tEl, tAttrs) {
            var _id = tEl.attr("data-hm-partial-id") || tEl.attr("id"), partial = PartialService.get(_id);
            try {
               tAttrs.$addClass(partial.classes);
            } catch (e) {}
            if (partial.hasOwnProperty("src") && partial.src.length) {
               try {
                  tEl.attr("data-hm-partial-src", partial.src);
               } catch (e) {}
               return partial.src;
            }
            $exceptionHandler("hitmands.partial, Partial Not Correctly Registered");
         }
      };
   }
   PartialDirectiveFactory.$inject = ['PartialService', '$exceptionHandler'];

   angular.module("hitmands.partial", []).provider("PartialService", PartialProviderFactory).directive("hmPartial", PartialDirectiveFactory);
//# sourceMappingURL=angular-hitmands-partial.js.map

})(window, angular);