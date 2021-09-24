"use strict";
// Copyright (c) Vidar Tonaas Fauske
// Distributed under the terms of the Modified BSD License.
Object.defineProperty(exports, "__esModule", { value: true });
const base_1 = require("@jupyter-widgets/base");
const time_1 = require("./time");
const datetime_1 = require("./datetime");
const naive_1 = require("./naive");
const version_1 = require("./version");
const EXTENSION_ID = 'jupyter-widget-datetime:plugin';
/**
 * The widget plugin.
 */
const plugin = {
    // TODO: Reintroduce typing when phosphor/lumino transition completed
    //const plugin: IPlugin<Application<Widget>, void> = {
    id: EXTENSION_ID,
    requires: [base_1.IJupyterWidgetRegistry],
    activate: activateWidgetExtension,
    autoStart: true
};
exports.default = plugin;
/**
 * Activate the widget extension.
 */
function activateWidgetExtension(app, registry) {
    registry.registerWidget({
        name: version_1.MODULE_NAME,
        version: version_1.MODULE_VERSION,
        exports: {
            TimeModel: time_1.TimeModel,
            TimeView: time_1.TimeView,
            DatetimeModel: datetime_1.DatetimeModel,
            DatetimeView: datetime_1.DatetimeView,
            NaiveDatetimeModel: naive_1.NaiveDatetimeModel,
        },
    });
}
//# sourceMappingURL=plugin.js.map