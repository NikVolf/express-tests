/**
 * Created by nikky on 12/6/14.
 */

var express = require('express');
var router = express.Router();
var q = require("q");

router.get("/js/api/:service/client.js", sendClientJS);
router.get("/api/:service/:id", serviceCall(restGetOne));
router.get("/api/:service", serviceCall(restGet));
router.post("/api/:service", serviceCall(restCreate));
router.put("/api/:service/:id", serviceCall(restUpdate));
router.get("/api", listServices);

module.exports = router;

var _ = require("underscore");

function listServices(req, res) {
    res.json({
        service: "test",
        client: "/api/test/client.js",
        rest: "/api/test"
    })
}

function resolveService(serviceReference) {
    var serviceModule = require("./../services/" + serviceReference);
    if (serviceModule.isPrivate)
        return null;
    return serviceModule();
}

function serviceCall(fn) {
    return function(req, res, next) {
        var serviceName = req.param("service");
        var service = resolveService(serviceName);
        if (service == null) {
            res.sendStatus(403);
            return;
        }

        var context = {
            req: req,
            res: res,
            next: next
        };

        fn(context, service);
    }
}

function jsonResponse (context) {
    return function(data) { context.res.json(data); };
}

function restGet(context, service) {
    // why this shit gets the request be forever pending ??
    // q.when(service.getItems()).then(jsonResponse(context));
    q.when(service.getItems()).then(function(data) {
        context.res.json(data);
    });
}

function restGetOne(context, service) {
    q.when(service.getItem(this.req.params.id)).then(function(data) {
        context.res.json(data);
    });
}

function restUpdate(context, service) {
    q.when(service.updateItem(context.req.params.id, context.req.body)).then(function(data){
        context.res.json(data);
    });
}
function restDelete(context, service) {
    q.when(service.deleteItem(this.req.params.id)).then(this.res.sendStatus(200));
}

function restCreate(context, service) {
    q.when(service.createItem(context.req.body)).then(function(data){
        context.res.json(data);
    });
}

function rpcCall(serviceReference, methodName, objectId) {
    var service = resolveService(serviceReference);
    var action = service.actions[methodName];
    if (!action)
        throw Error("No rpc method " + methodName + " in service " + serviceReference);

    var result = action.execute(objectId, this.body);

    if (!result) {
        this.plain("");
        return;
    }

    this.json(result);
}

var util = require("util");

var contentType = "application/javascript";

function generateClientJS(serviceReference) {
    var service = resolveService(serviceReference);
    console.log("Generating client for " + serviceReference + ": " + JSON.stringify(service));
    return service.generateClient();
}

var noCacheHeaders = {
    'Cache-Control': 'no-cache, no-store, must-revalidate',
    'Pragma': 'no-cache',
    'Expires': '0'
};

function sendClientJS(req, res, next) {

    var data = generateClientJS(req.params.service);

    res.set("Content-Type", contentType);
    res.set(noCacheHeaders);

    res.send(data);

}


