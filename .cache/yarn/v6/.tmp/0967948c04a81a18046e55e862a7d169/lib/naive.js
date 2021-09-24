"use strict";
// Copyright (c) Vidar Tonaas Fauske
// Distributed under the terms of the Modified BSD License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.NaiveDatetimeModel = exports.naive_serializers = exports.deserialize_naive = exports.serialize_naive = void 0;
const widget_core_1 = require("@jupyter-widgets/controls/lib/widget_core");
const datetime_1 = require("./datetime");
function serialize_naive(value) {
    if (value === null) {
        return null;
    }
    else {
        return {
            year: value.getFullYear(),
            month: value.getMonth(),
            date: value.getDate(),
            hours: value.getHours(),
            minutes: value.getMinutes(),
            seconds: value.getSeconds(),
            milliseconds: value.getMilliseconds(),
        };
    }
}
exports.serialize_naive = serialize_naive;
function deserialize_naive(value) {
    if (value === null) {
        return null;
    }
    else {
        let date = new Date();
        date.setFullYear(value.year, value.month, value.date);
        date.setHours(value.hours, value.minutes, value.seconds, value.milliseconds);
        return date;
    }
}
exports.deserialize_naive = deserialize_naive;
exports.naive_serializers = {
    serialize: serialize_naive,
    deserialize: deserialize_naive
};
class NaiveDatetimeModel extends datetime_1.DatetimeModel {
    defaults() {
        return Object.assign(Object.assign({}, super.defaults()), { _model_name: NaiveDatetimeModel.model_name, _view_name: NaiveDatetimeModel.view_name });
    }
}
exports.NaiveDatetimeModel = NaiveDatetimeModel;
NaiveDatetimeModel.serializers = Object.assign(Object.assign({}, widget_core_1.CoreDescriptionModel.serializers), { value: exports.naive_serializers, min: exports.naive_serializers, max: exports.naive_serializers });
NaiveDatetimeModel.model_name = 'NaiveDatetimeModel';
//# sourceMappingURL=naive.js.map