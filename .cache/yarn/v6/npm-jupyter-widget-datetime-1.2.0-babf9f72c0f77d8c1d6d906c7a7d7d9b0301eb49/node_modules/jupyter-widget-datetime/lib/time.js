"use strict";
// Copyright (c) Vidar Tonaas Fauske
// Distributed under the terms of the Modified BSD License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.TimeView = exports.TimeModel = exports.time_serializers = exports.deserialize_time = exports.serialize_time = void 0;
const controls_1 = require("@jupyter-widgets/controls");
const widget_core_1 = require("@jupyter-widgets/controls/lib/widget_core");
const version_1 = require("./version");
const PARSER = /(\d\d):(\d\d)(:(\d\d)(.(\d{1,3})\d*)?)?/;
function serialize_time(value) {
    if (value === null) {
        return null;
    }
    else {
        const res = PARSER.exec(value);
        if (res === null) {
            return null;
        }
        return {
            hours: Math.min(23, parseInt(res[1], 10)),
            minutes: Math.min(59, parseInt(res[2], 10)),
            seconds: res[4] ? Math.min(59, parseInt(res[4], 10)) : 0,
            milliseconds: res[6] ? parseInt(res[6], 10) : 0,
        };
    }
}
exports.serialize_time = serialize_time;
function deserialize_time(value) {
    if (value === null) {
        return null;
    }
    else {
        const parts = [`${value.hours.toString().padStart(2, "0")}:${value.minutes.toString().padStart(2, "0")}`];
        if (value.seconds > 0 || value.milliseconds > 0) {
            parts.push(`:${value.seconds.toString().padStart(2, "0")}`);
            if (value.milliseconds > 0) {
                parts.push(`.${value.milliseconds.toString().padStart(3, "0")}`);
            }
        }
        return parts.join('');
    }
}
exports.deserialize_time = deserialize_time;
exports.time_serializers = {
    serialize: serialize_time,
    deserialize: deserialize_time
};
class TimeModel extends widget_core_1.CoreDescriptionModel {
    defaults() {
        return Object.assign(Object.assign({}, super.defaults()), { _model_name: TimeModel.model_name, _model_module: TimeModel.model_module, _model_module_version: TimeModel.model_module_version, _view_name: TimeModel.view_name, _view_module: TimeModel.view_module, _view_module_version: TimeModel.view_module_version, value: null, disabled: false, min: null, max: null, step: 60 });
    }
}
exports.TimeModel = TimeModel;
TimeModel.serializers = Object.assign(Object.assign({}, widget_core_1.CoreDescriptionModel.serializers), { value: exports.time_serializers, min: exports.time_serializers, max: exports.time_serializers });
TimeModel.model_name = 'TimeModel';
TimeModel.model_module = version_1.MODULE_NAME;
TimeModel.model_module_version = version_1.MODULE_VERSION;
TimeModel.view_name = 'TimeView';
TimeModel.view_module = version_1.MODULE_NAME;
TimeModel.view_module_version = version_1.MODULE_VERSION;
class TimeView extends controls_1.DescriptionView {
    render() {
        super.render();
        this.el.classList.add('jupyter-widgets');
        this.el.classList.add('widget-inline-hbox');
        this.el.classList.add('widget-timepicker');
        this._timepicker = document.createElement('input');
        this._timepicker.setAttribute('type', 'time');
        this._timepicker.id = this.label.htmlFor = controls_1.uuid();
        this.el.appendChild(this._timepicker);
        this.listenTo(this.model, 'change:value', this._update_value);
        this.listenTo(this.model, 'change', this.update2);
        this._update_value();
        this.update2();
    }
    /**
     * Update the contents of this view
     *
     * Called when the model is changed. The model may have been
     * changed by another view or by a state update from the back-end.
     */
    update2(model, options) {
        if (options === undefined || options.updated_view !== this) {
            this._timepicker.disabled = this.model.get('disabled');
            this._timepicker.min = this.model.get('min');
            this._timepicker.max = this.model.get('max');
            this._timepicker.step = this.model.get('step');
        }
        return super.update();
    }
    events() {
        // Typescript doesn't understand that these functions are called, so we
        // specifically use them here so it knows they are being used.
        void this._picker_change;
        void this._picker_focusout;
        return {
            'change [type="time"]': '_picker_change',
            'focusout [type="time"]': '_picker_focusout'
        };
    }
    _update_value(model, newValue, options) {
        if (options === undefined || options.updated_view !== this) {
            this._timepicker.value = this.model.get('value');
            ;
        }
    }
    _picker_change() {
        if (!this._timepicker.validity.badInput) {
            this.model.set('value', this._timepicker.value, { updated_view: this });
            this.touch();
        }
    }
    _picker_focusout() {
        if (this._timepicker.validity.badInput) {
            this.model.set('value', null, { updated_view: this });
            this.touch();
        }
    }
}
exports.TimeView = TimeView;
//# sourceMappingURL=time.js.map