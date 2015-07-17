angular.module("keepit").config(['$urlRouterProvider', '$stateProvider', '$locationProvider',
    function($urlRouterProvider, $stateProvider, $locationProvider){

        $locationProvider.html5Mode(true);

        $stateProvider
            .state('home', {
                url: "/",
                controller: "HomeCtrl",
                templateUrl: "client/home/views/home.ng.html"
            })
            .state('notes', {
                url: "/notes",
                controller: "NotesCtrl",
                templateUrl: "client/notes/views/notes.ng.html"
            })
            .state('todos', {
                url: "/todos",
                controller: "TodosCtrl",
                templateUrl: "client/todos/views/todos.ng.html"
            });

        $urlRouterProvider.otherwise("/");
    }]);