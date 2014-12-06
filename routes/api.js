/**
 * Created by nikky on 12/6/14.
 */

var express = require('express');
var router = express.Router();

router.get("/js/api/:service/client.js", sendClientJS);
router.get("/api/:service/:id", serviceCall(restGetOne));
router.get("/api/:service", serviceCall(restGet));
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
    return serviceModule();
}

function serviceCall(fn) {
    return function(req, res, next) {
        var serviceName = req.param("service");
        var service = resolveService(serviceName);
        fn.bind({
            req: req,
            res: res,
            next: next
        })(service);
    }
}

function restGet(service) {
    this.res.json(service.getItems());
}

function restGetOne(service) {
    this.res.json(service.getItem(this.req.params.id));
}

function restUpdate(service) {
    var original = service.getItem(this.req.params.id);
    var update = this.req.body;
    _.extend(original, update);
    service.updateItem(original);
}

function restDelete(service) {
    service.deleteItem(this.req.params.id);
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


