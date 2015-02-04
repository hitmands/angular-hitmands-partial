(function(window, angular) {
   var app = angular.module('hitmands.partial.sample', ['hitmands.partial']);

   app
      .config(function(PartialServiceProvider) {

         PartialServiceProvider
            .register({
               id: 'test',
               src: 'partials/test.html',
               classes: 'testing-classes-as-string'
            })
            .register({
               id: 'test2',
               src: 'partials/test2.html',
               classes: ['testing-classes-as-array', 'testing-classes-as-array2']
            })
            .register({
               id: 'test3',
               src: 'partials/test3.html'
            })
            .register([
               {
                  id: 'test4',
                  src: 'partials/test4.html',
                  classes: []
               },
               {
                  id: 'test5',
                  src: 'partials/test5.html',
                  classes: []
               },
               {
                  id: 'test6',
                  src: 'partials/test6.html',
                  classes: []
               },
               {
                  id: 'test7',
                  src: 'partials/test7.html',
                  classes: []
               }
            ])
         ;

      })
      .run(function(PartialService) {
         console.log('partial reg', PartialService.get('test'));
      })
      .controller('TestCtrl', function() {
         var vm = this;
      })
   ;

})(window, angular);
