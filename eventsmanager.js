function EventsManager(owner){
    var eventHandlers = {};
    this.on = function(event, handler){
        if(!eventHandlers[event]){
            eventHandlers[event] = [];
        }
        eventHandlers[event].push(handler);
    };
    this.trigger = function(event){
        var handlers = eventHandlers[event];
        if(!handlers) return;
        for(var i = 0; i < handlers.length; ++i){
            handlers[i].apply(owner);
        }
    };
    this.off = function(event, handler){
        if(!handler){
            delete eventHandlers[event];
        }else{
            var handlers = eventHandlers[event];
            if(handlers){
                handlers.splice(handlers.indexOf(handler), 1);
            }
        }
    }
}