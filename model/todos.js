Todos = new Mongo.Collection("todos");

Todos.allow({
    insert: function (userId) {
        return userId;
    },
    update: function (userId, todo, fields, modifier) {
        if (userId !== todo.owner)
            return false;

        return true;
    },
    remove: function (userId, todo) {
        if (userId !== todo.owner)
            return false;

        return true;
    }
});