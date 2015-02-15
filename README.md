# Angular Hitmands Partial


### Simple way to manage partials in [AngularJS](http://angularjs.org) based Applications.
___


Table of Content:
* [Getting Started](#getting-started)
* [Configuration](#module-config)
* [Usage](#module-usage)
* [API - PartialServiceProvider](#module-provider-register)
  * [Register](#module-provider-register)
* [API - PartialService](#module-service-get)
  * [get](#module-service-get)

##<a name="getting-started"></a> Get Started
```shell
$ bower install --save angular-hitmands-partial
```


```html
<!doctype html>
<html data-ng-app="myApp">
<head>
    <!-- Install AngularJS -->
    <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.3.7/angular.min.js"></script>

    <!-- Install Angular Hitmands Partial -->
    <script src="js/angular-hitmands-partial.min.js"></script>

    <!-- Create Your App-->
    <script>
        var myApp = angular.module('myApp', ['hitmands.partial']);
    </script>
    ...
</head>
<body>
    ...
</body>
</html>
```


##<a name="module-config"></a> Configuration
```javascript

angular
    .module('myApp')
    .config(function(PartialServiceProvider) {

    PartialServiceProvider
        .register({
           id: 'test',
           src: 'partials/test.html',
           classes: 'classes-as-string'
        })
        .register({
           id: 'test2',
           src: 'partials/test2.html',
           classes: ['my-class']
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

        console.log('All Partials Registered', PartialService.get());
        console.log('Partial 6', PartialService.get('test6'));
        console.log('Partial 7', PartialService.get('partials/test7.html'));

    });
```

##<a name="module-directive"></a> Usage

```html
<body>

    <!--Use the id of the registered partial object-->
    <hm-partial id="test"></hm-partial>

    <hm-partial data-hm-partial-id="test2"></hm-partial>

</body>
```

##<a name="module-provider-register"></a> PartialServiceProvider.register
This method register a Partial Object.

PARAM         | TYPE                | DESCRIPTION
------------- | ------------------- | -------------
Partial       | Object/Array        | An Object or Array of Objects with the following properties `{src: String, id: String/Number, classes: Array of strings}`.


##<a name="module-service-get"></a> PartialService.get
This method is a Getter for Partial Configuration Object. If is called without params returns all registered Partials.

PARAM                    | TYPE          | DESCRIPTION
------------------------ | ------------- | -------------
reference (optional)     | String        | Id or path of the registered partial.
