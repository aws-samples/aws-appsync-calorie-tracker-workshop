"use strict";
/*
 * Copyright 2017-2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with
 * the License. A copy of the License is located at
 *
 *     http://aws.amazon.com/apache2.0/
 *
 * or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR
 * CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions
 * and limitations under the License.
 */
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
var Analytics_1 = require("./Analytics");
exports.AnalyticsClass = Analytics_1.default;
var core_1 = require("@aws-amplify/core");
var logger = new core_1.ConsoleLogger('Analytics');
var endpointUpdated = false;
var authConfigured = false;
var analyticsConfigured = false;
var _instance = null;
if (!_instance) {
    logger.debug('Create Analytics Instance');
    _instance = new Analytics_1.default();
}
var Analytics = _instance;
core_1.default.register(Analytics);
exports.default = Analytics;
__export(require("./Providers"));
Analytics.onHubCapsule = function (capsule) {
    var channel = capsule.channel, payload = capsule.payload, source = capsule.source;
    logger.debug('on hub capsule ' + channel, payload);
    switch (channel) {
        case 'auth':
            authEvent(payload);
            break;
        case 'storage':
            storageEvent(payload);
            break;
        case 'analytics':
            analyticsEvent(payload);
            break;
        default:
            break;
    }
};
var storageEvent = function (payload) {
    var attrs = payload.attrs, metrics = payload.metrics;
    if (!attrs)
        return;
    Analytics.record({
        name: 'Storage',
        attributes: attrs,
        metrics: metrics
    });
};
var authEvent = function (payload) {
    var event = payload.event;
    if (!event) {
        return;
    }
    switch (event) {
        case 'signIn':
            Analytics.record({
                name: '_userauth.sign_in'
            });
            break;
        case 'signUp':
            Analytics.record({
                name: '_userauth.sign_up'
            });
            break;
        case 'signOut':
            break;
        case 'signIn_failure':
            Analytics.record({
                name: '_userauth.auth_fail'
            });
            break;
        case 'configured':
            authConfigured = true;
            if (authConfigured && analyticsConfigured) {
                if (!endpointUpdated) {
                    Analytics.updateEndpoint({}).catch(function (e) {
                        logger.debug('Failed to update the endpoint', e);
                    });
                }
                Analytics.autoTrack('session', {
                    enable: (Analytics.configure())['autoSessionRecord']
                });
                endpointUpdated = true;
            }
            break;
    }
};
var analyticsEvent = function (payload) {
    var event = payload.event;
    if (!event)
        return;
    switch (event) {
        case 'configured':
            analyticsConfigured = true;
            if (authConfigured && analyticsConfigured) {
                if (!endpointUpdated) {
                    Analytics.updateEndpoint({}).catch(function (e) {
                        logger.debug('Failed to update the endpoint', e);
                    });
                }
                Analytics.autoTrack('session', {
                    enable: (Analytics.configure())['autoSessionRecord']
                });
                endpointUpdated = true;
            }
            break;
    }
};
core_1.Hub.listen('auth', Analytics);
core_1.Hub.listen('storage', Analytics);
core_1.Hub.listen('analytics', Analytics);
//# sourceMappingURL=index.js.map