/// <reference types="backbone" />
import { ISerializers } from '@jupyter-widgets/base';
import { DescriptionView } from '@jupyter-widgets/controls';
import { CoreDescriptionModel } from '@jupyter-widgets/controls/lib/widget_core';
export interface SerializedTime {
    /**
     * Integer hour (24H format)
     */
    hours: number;
    /**
     * Integer minutes
     */
    minutes: number;
    /**
     * Integer seconds
     */
    seconds: number;
    /**
     * Millisconds
     */
    milliseconds: number;
}
export declare function serialize_time(value: string): SerializedTime | null;
export declare function deserialize_time(value: SerializedTime): string | null;
export declare const time_serializers: {
    serialize: typeof serialize_time;
    deserialize: typeof deserialize_time;
};
export declare class TimeModel extends CoreDescriptionModel {
    defaults(): any;
    static serializers: ISerializers;
    static model_name: string;
    static model_module: any;
    static model_module_version: any;
    static view_name: string;
    static view_module: any;
    static view_module_version: any;
}
export declare class TimeView extends DescriptionView {
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
    private _timepicker;
}
