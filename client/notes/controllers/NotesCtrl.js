angular.module("keepit").controller('NotesCtrl', ['$scope', '$rootScope', '$state', '$meteor', function ($scope, $rootScope, $state, $meteor) {

    $scope.notes = $meteor.collection(Notes, false).subscribe('notes');

    $scope.addingNote = false;
    $scope.editingNote = false;
    $scope.editingNotePosition = false;

    $scope.addNote = function() {
        if($rootScope.currentUser)
            $scope.addingNote = true;
    };

    $scope.cancelAddNote = function() {
        $scope.addingNote = false;
    };

    // store new note
    $scope.storeNote = function(note) {

        note.createdAt = new Date().getTime();
        note.lastUpdatedAt = new Date().getTime();

        note.owner= $rootScope.currentUser._id;
        note.archived= false;
        $scope.notes.save(note);

        $scope.addingNote = false;
        $state.go('notes');
    };

    // show edit note
    $scope.editNote = function (note) {
        $scope.editingNotePosition = $scope.notes.indexOf(note);
        $scope.editingNote = $scope.notes[$scope.editingNotePosition];

        $scope.originalNote = angular.extend({}, $scope.editingNote);
    };

    // save the update
    $scope.updateNote = function () {
        $scope.editingNote.lastUpdatedAt = new Date().getTime();
        $scope.notes[$scope.editingNotePosition] = $scope.editingNote;

        $scope.notes.save();

        $scope.editingNotePosition = false;
        $scope.editingNote = false;
    };

    // cancel editing
    $scope.cancelUpdateNote = function () {
        $scope.notes[$scope.editingNotePosition] = $scope.originalNote;
        $scope.editingNotePosition = false;
        $scope.editingNote = false;
    };

    // archive
    $scope.archiveNote = function () {
        $scope.editingNote.archived = true;
        $scope.notes[$scope.editingNotePosition] = $scope.editingNote;
        $scope.notes.save();

        $scope.editingNotePosition = false;
        $scope.editingNote = false;
    };

    // unarchive
    $scope.unArchiveNote = function () {
        $scope.editingNote.archived = false;
        $scope.notes[$scope.editingNotePosition] = $scope.editingNote;
        $scope.notes.save();

        $scope.editingNotePosition = false;
        $scope.editingNote = false;
    };

    // delete a note
    $scope.deleteNote = function(note) {
        $scope.notes.remove(note);
    };

    // change color
    $scope.changeColor = function (color) {
        $scope.editingNote.color = color;
        $scope.notes[$scope.editingNotePosition] = $scope.editingNote;
        $scope.notes.save();
        $scope.originalNote.color = color;
    };
}]);