//done
Meteor.publish("notes", function () {
    return Notes.find({
        owner: this.userId
    });
});