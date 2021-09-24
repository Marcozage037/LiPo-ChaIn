"use strict";
// Copyright (c) Vidar Tonaas Fauske
// Distributed under the terms of the Modified BSD License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatetimeView = exports.DatetimeModel = exports.datetime_serializers = exports.deserialize_datetime = exports.serialize_datetime = void 0;
const controls_1 = require("@jupyter-widgets/controls");
const widget_core_1 = require("@jupyter-widgets/controls/lib/widget_core");
const version_1 = require("./version");
const time_1 = require("./time");
function serialize_datetime(value) {
    if (value === null) {
        return null;
    }
    else {
        return {
            year: value.getUTCFullYear(),
            month: value.getUTCMonth(),
            date: value.getUTCDate(),
            hours: value.getUTCHours(),
            minutes: value.getUTCMinutes(),
            seconds: value.getUTCSeconds(),
            milliseconds: value.getUTCMilliseconds(),
        };
    }
}
exports.serialize_datetime = serialize_datetime;
function deserialize_datetime(value) {
    if (value === null) {
        return null;
    }
    else {
        let date = new Date();
        date.setUTCFullYear(value.year, value.month, value.date);
        date.setUTCHours(value.hours, value.minutes, value.seconds, value.milliseconds);
        return date;
    }
}
exports.deserialize_datetime = deserialize_datetime;
exports.datetime_serializers = {
    serialize: serialize_datetime,
    deserialize: deserialize_datetime
};
class DatetimeModel extends widget_core_1.CoreDescriptionModel {
    defaults() {
        return Object.assign(Object.assign({}, super.defaults()), { _model_name: DatetimeModel.model_name, _model_module: DatetimeModel.model_module, _model_module_version: DatetimeModel.model_module_version, _view_name: DatetimeModel.view_name, _view_module: DatetimeModel.view_module, _view_module_version: DatetimeModel.view_module_version, value: null, disabled: false, min: null, max: null });
    }
}
exports.DatetimeModel = DatetimeModel;
DatetimeModel.serializers = Object.assign(Object.assign({}, widget_core_1.CoreDescriptionModel.serializers), { value: exports.datetime_serializers, min: exports.datetime_serializers, max: exports.datetime_serializers });
DatetimeModel.model_name = 'DatetimeModel';
DatetimeModel.model_module = version_1.MODULE_NAME;
DatetimeModel.model_module_version = version_1.MODULE_VERSION;
DatetimeModel.view_name = 'DatetimeView';
DatetimeModel.view_module = version_1.MODULE_NAME;
DatetimeModel.view_module_version = version_1.MODULE_VERSION;
class DatetimeView extends controls_1.DescriptionView {
    render() {
        super.render();
        this.el.classList.add('jupyter-widgets');
        this.el.classList.add('widget-inline-hbox');
        this.el.classList.add('widget-datetimepicker');
        const test = document.createElement('input');
        test.type = 'datetime-local';
        if (test.type === 'text') {
            // No native support, split into date and time input:
            this._datepicker = document.createElement('input');
            this._datepicker.setAttribute('type', 'date');
            this._datepicker.id = this.label.htmlFor = controls_1.uuid();
            this._timepicker = document.createElement('input');
            this._timepicker.setAttribute('type', 'time');
            this._timepicker.id = controls_1.uuid();
            this.el.appendChild(this._datepicker);
            this.el.appendChild(this._timepicker);
        }
        else {
            this._datetimepicker = test;
            this._datetimepicker.id = this.label.htmlFor = controls_1.uuid();
            this.el.appendChild(this._datetimepicker);
        }
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
            const min = this.model.get('min');
            const max = this.model.get('max');
            if (this._datetimepicker) {
                this._datetimepicker.disabled = this.model.get('disabled');
                this._datetimepicker.min = Private.dt_as_dt_string(min);
                this._datetimepicker.max = Private.dt_as_dt_string(max);
            }
            else {
                this._datepicker.disabled = this.model.get('disabled');
                this._datepicker.min = Private.dt_as_date_string(min);
                this._datepicker.max = Private.dt_as_date_string(max);
                this._timepicker.disabled = this.model.get('disabled');
                // Don't support min/max time here.
                // It could be added by enabling min time if value is min date,
                // and enabling max time if value is max date, but leave as
                // TODO for now.
            }
        }
    }
    events() {
        // Typescript doesn't understand that these functions are called, so we
        // specifically use them here so it knows they are being used.
        void this._picker_change;
        void this._picker_focusout;
        return {
            'change [type="date"]': '_picker_change',
            'change [type="time"]': '_picker_change',
            'change [type="datetime-local"]': '_picker_change',
            'focusout [type="date"]': '_picker_focusout',
            'focusout [type="datetime-local"]': '_picker_focusout',
            'focusout [type="time"]': '_picker_focusout'
        };
    }
    _update_value(model, newValue, options) {
        if (options === undefined || options.updated_view !== this) {
            const value = this.model.get('value');
            if (this._datetimepicker) {
                this._datetimepicker.value = Private.dt_as_dt_string(value);
            }
            else {
                this._datepicker.valueAsDate = value;
                this._timepicker.value = Private.dt_as_time_string(value);
            }
        }
    }
    _picker_change() {
        if (this._datetimepicker) {
            if (!this._datetimepicker.validity.badInput) {
                const v = this._datetimepicker.value;
                let date = v ? new Date(v) : null;
                if (date && isNaN(date.valueOf())) {
                    date = null;
                }
                this.model.set('value', date, { updated_view: this });
                this.touch();
            }
        }
        else {
            if (!this._datepicker.validity.badInput
                && !this._timepicker.validity.badInput) {
                const date = this._datepicker.valueAsDate;
                const time = time_1.serialize_time(this._timepicker.value);
                if (date !== null && time !== null) {
                    // * Use local time *
                    date.setHours(time.hours, time.minutes, time.seconds, time.milliseconds);
                }
                this.model.set('value', time !== null && date, { updated_view: this });
                this.touch();
            }
        }
    }
    _picker_focusout() {
        const pickers = [
            this._datetimepicker,
            this._datepicker,
            this._timepicker
        ];
        if (pickers.some(p => p && p.validity.badInput)) {
            this.model.set('value', null);
            this.touch();
        }
    }
}
exports.DatetimeView = DatetimeView;
var Private;
(function (Private) {
    function dt_as_dt_string(value) {
        if (value === null) {
            return '';
        }
        // Replicate `toISOString()` but in local time zone:
        const parts = [];
        parts.push(`${value.getFullYear().toString().padStart(4, "0")}`);
        parts.push(`-${(value.getMonth() + 1).toString().padStart(2, "0")}`);
        parts.push(`-${value.getDate().toString().padStart(2, "0")}`);
        parts.push(`T${value.getHours().toString().padStart(2, "0")}`);
        parts.push(`:${value.getMinutes().toString().padStart(2, "0")}`);
        if (value.getSeconds() > 0 || value.getMilliseconds() > 0) {
            parts.push(`:${value.getSeconds().toString().padStart(2, "0")}`);
            if (value.getMilliseconds() > 0) {
                parts.push(`.${value.getMilliseconds().toString().padStart(3, "0")}`);
            }
        }
        return parts.join('');
    }
    Private.dt_as_dt_string = dt_as_dt_string;
    function dt_as_date_string(value) {
        return value
            ? dt_as_dt_string(value).split('T', 2)[0]
            : '';
    }
    Private.dt_as_date_string = dt_as_date_string;
    function dt_as_time_string(value) {
        return value
            ? dt_as_dt_string(value).split('T', 2)[1]
            : '';
    }
    Private.dt_as_time_string = dt_as_time_string;
})(Private || (Private = {}));
//# sourceMappingURL=datetime.js.map