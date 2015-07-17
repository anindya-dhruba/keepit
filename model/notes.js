Notes = new Mongo.Collection("notes");

Notes.allow({
    insert: function (userId) {
        return userId;
    },
    update: function (userId, note, fields, modifier) {
        if (userId !== note.owner)
            return false;

        return true;
    },
    remove: function (userId, note) {
        if (userId !== note.owner)
            return false;

        return true;
    }
});