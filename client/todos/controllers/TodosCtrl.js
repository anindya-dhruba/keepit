angular.module("keepit").controller('TodosCtrl', ['$scope', '$rootScope', '$state', '$meteor', function ($scope, $rootScope, $state, $meteor) {

    $scope.todos = $meteor.collection(Todos, false).subscribe('todos');

    $scope.addingTodo = false;
    $scope.editingTodo = false;
    $scope.editingTodoPosition = false;
    $scope.newTodo = {countCompleted: 0};
    $scope.newTodo.todos = [];
    $scope.newTodoSingle = {};

    $scope.addTodo = function() {
        if($rootScope.currentUser)
            $scope.addingTodo = true;
    };

    $scope.cancelAddTodo = function() {
        $scope.addingTodo = false;
        $scope.newTodo = {countCompleted: 0};
        $scope.newTodo.todos = [];
    };

    $scope.storeTodo = function(newTodo) {
        if(newTodo.todos.length === 0) return;

        newTodo.createdAt = new Date().getTime();
        newTodo.lastUpdatedAt = new Date().getTime();
        newTodo.owner = $rootScope.currentUser._id;
        newTodo.archived = false;

        $scope.todos.save(newTodo);
        $scope.newTodo = {countCompleted: 0};
        $scope.newTodo.todos = [];
        $scope.addingTodo = false;
    };

    $scope.addToTodoList = function(newTodoSingle) {
        if(!newTodoSingle.text) return;
        $scope.newTodo.todos.push({text: newTodoSingle.text, done: false});
        $scope.newTodoSingle = {};
    };

    $scope.removeFromTodoList = function(newOneTodo) {
        var index = $scope.newTodo.todos.indexOf(newOneTodo);
        if(newOneTodo.done === true) $scope.newTodo.countCompleted--;
        $scope.newTodo.todos.splice(index, 1);
    };

    $scope.removeFromEditingTodoList = function(OneTodo) {
        var singleIndex = $scope.editingTodo.todos.indexOf(OneTodo);

        if(OneTodo.done === true && !$scope.tempCountCompleted) {
            $scope.tempCountCompleted = $scope.todos[$scope.editingTodoPosition].countCompleted - 1;
        }
        else {
            $scope.tempCountCompleted--
        }
        console.log($scope.tempCountCompleted);

        $scope.editingTodo.todos.splice(singleIndex, 1);
    };

    $scope.checkNewTodo = function(singleTodo) {
        var index = $scope.newTodo.todos.indexOf(singleTodo);

        $scope.newTodo.todos[index] = singleTodo;

        if(singleTodo.done === true)
            $scope.newTodo.countCompleted++;
        else
            $scope.newTodo.countCompleted--;
    };

    $scope.checkTodo = function(todo, singleTodo) {
        var index = $scope.todos.indexOf(todo);
        var singleIndex = $scope.todos[index].todos.indexOf(singleTodo);

        $scope.todos[index].todos[singleIndex] = singleTodo;

        if(singleTodo.done === true)
            $scope.todos[index].countCompleted++;
        else
            $scope.todos[index].countCompleted--;

        $scope.todos.save();
    };

    $scope.editTodo = function (todo) {
        $scope.editingTodoPosition = $scope.todos.indexOf(todo);
        $scope.editingTodo = $scope.todos[$scope.editingTodoPosition];

        $scope.originalTodo = angular.copy($scope.editingTodo);
    };

    $scope.addToEditingTodoList = function(newTodoSingle) {
        if(!newTodoSingle.text) return;
        $scope.editingTodo.todos.push({text: newTodoSingle.text, done: false});
        $scope.newTodoSingleForEditingTodo.text = '';
    };

    // save the update
    $scope.updateTodo = function () {
        $scope.editingTodo.lastUpdatedAt = new Date().getTime();
        $scope.todos[$scope.editingTodoPosition] = $scope.editingTodo;

        $scope.todos.save();

        $scope.editingTodoPosition = false;
        $scope.editingTodo = false;
    };

    $scope.archive = function () {
        $scope.editingTodo.archived = true;
        $scope.todos[$scope.editingTodoPosition] = $scope.editingTodo;
        $scope.todos.save();

        $scope.editingTodoPosition = false;
        $scope.editingTodo = false;
    };


    $scope.unArchive = function () {
        $scope.editingTodo.archived = false;
        $scope.todos[$scope.editingTodoPosition] = $scope.editingTodo;
        $scope.todos.save();

        $scope.editingTodoPosition = false;
        $scope.editingTodo = false;
    };

    $scope.cancelUpdateTodo = function () {
        $scope.todos[$scope.editingTodoPosition] = $scope.originalTodo;
        console.log($scope.originalTodo);
        $scope.editingTodoPosition = false;
        $scope.editingTodo = false;
    };

    $scope.deleteTodo = function(todo) {
        $scope.todos.remove(todo);
    };

    $scope.changeColor = function (color) {
        $scope.editingTodo.color = color;
        $scope.todos[$scope.editingTodoPosition] = $scope.editingTodo;
        $scope.todos.save();
        $scope.originalTodo.color = color;
    };

}]);