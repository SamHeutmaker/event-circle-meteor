Events = new Mongo.Collection('events');

Events.allow({
	insert: function(userId, event) {
		return true;
	},
	update: function(userId, event, fields, modifer) {
		return userId && event.owner === userId;
	},
	remove: function(userId, event) {
		return userId && event.owner === userId;
	}
});