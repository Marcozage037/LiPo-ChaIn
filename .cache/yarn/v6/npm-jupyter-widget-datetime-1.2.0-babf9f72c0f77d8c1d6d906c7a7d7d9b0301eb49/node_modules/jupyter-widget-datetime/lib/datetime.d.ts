/// <reference types="backbone" />
import { ISerializers } from '@jupyter-widgets/base';
import { DescriptionView } from '@jupyter-widgets/controls';
import { CoreDescriptionModel } from '@jupyter-widgets/controls/lib/widget_core';
export interface SerializedDatetime {
    /**
     * UTC full year
     */
    year: number;
    /**
     * UTC zero-based month (0 means January, 11 means December)
     */
    month: number;
    /**
     * UTC day of month
     */
    date: number;
    /**
     * UTC hour (24H format)
     */
    hours: number;
    /**
     * UTC minutes
     */
    minutes: number;
    /**
     * UTC seconds
     */
    seconds: number;
    /**
     * UTC millisconds
     */
    milliseconds: number;
}
export declare function serialize_datetime(value: Date): SerializedDatetime | null;
export declare function deserialize_datetime(value: SerializedDatetime): Date | null;
export declare const datetime_serializers: {
    serialize: typeof serialize_datetime;
    deserialize: typeof deserialize_datetime;
};
export declare class DatetimeModel extends CoreDescriptionModel {
    defaults(): any;
    static serializers: ISerializers;
    static model_name: string;
    static model_module: any;
    static model_module_version: any;
    static view_name: string;
    static view_module: any;
    static view_module_version: any;
}
export declare class DatetimeView extends DescriptionView {
    render(): void;
    /**
     * Update the contents of this view
     *
     * Called when the model is changed. The model may have been
     * changed by another view or by a state update from the back-end.
     */
    update2(model?: Backbone.Model, options?: any): void;
    events(): {
        [e: string]: string;
    };
    private _update_value;
    private _picker_change;
    private _picker_focusout;
    private _datetimepicker;
    private _timepicker;
    private _datepicker;
}
