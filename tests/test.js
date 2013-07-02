var assert = require("assert");
var EventsManager = require('../eventsmanager');

describe('EventsManager', function(){
    describe('on', function(){
        it('should bind an event to be fired', function(done){
            var eventsManager = new EventsManager();
            eventsManager.on("foo", function(){
                done();
            });
            eventsManager.trigger("foo");
        });
        it('should add event handlers not simply override them', function(done){
            var eventsManager = new EventsManager();
            eventsManager.on("foo", function(){
                done();
            });
            eventsManager.on("foo", function(){});
            eventsManager.trigger("foo");
        });
        it('should work with inheritance', function(done){
            function Foo(){}
            Foo.prototype = new EventsManager();
            var foo = new Foo();
            foo.on('foo', function(){
                done();
            });
            foo.trigger('foo');
        });
    });
    describe('trigger', function(){
        it('should fire events', function(done){
            var eventsManager = new EventsManager();
            eventsManager.on("foo", done);
            eventsManager.trigger("foo");
        });
        it('should fire only that type of events', function(){
            var eventsManager = new EventsManager();
            eventsManager.on("foo", function(){
                throw Error("Wrong type of event.")
            });
            eventsManager.trigger("bar");
        });
    });
    describe('off', function(){
        it('should remove the event handler', function(){
            var eventsManager = new EventsManager();
            var handler = function(){throw Error("shouldn't fire");};
            eventsManager.on("foo", handler);
            eventsManager.off("foo", handler);
            eventsManager.trigger("foo");
        });
        it('should remove only that event handler', function(done){
            var eventsManager = new EventsManager();
            var handler = function(){throw Error("shouldn't fire");};
            eventsManager.on("foo", handler);
            eventsManager.on("foo", function(){
                done();
            });
            eventsManager.off("foo", handler);
            eventsManager.trigger("foo");
        });
        it('should remove all event handlers when not given a specific one', function(){
            var eventsManager = new EventsManager();
            eventsManager.on("foo", function(){throw Error("shouldn't fire");});
            eventsManager.off("foo");
            eventsManager.trigger("foo");
        });
    });
});