import { ISerializers } from '@jupyter-widgets/base';
import { DatetimeModel } from './datetime';
export interface SerializedNaiveDatetime {
    /**
     * full year
     */
    year: number;
    /**
     * zero-based month (0 means January, 11 means December)
     */
    month: number;
    /**
     * day of month
     */
    date: number;
    /**
     * hour (24H format)
     */
    hours: number;
    /**
     * minutes
     */
    minutes: number;
    /**
     * seconds
     */
    seconds: number;
    /**
     * millisconds
     */
    milliseconds: number;
}
export declare function serialize_naive(value: Date): SerializedNaiveDatetime | null;
export declare function deserialize_naive(value: SerializedNaiveDatetime): Date | null;
export declare const naive_serializers: {
    serialize: typeof serialize_naive;
    deserialize: typeof deserialize_naive;
};
export declare class NaiveDatetimeModel extends DatetimeModel {
    defaults(): any;
    static serializers: ISerializers;
    static model_name: string;
}
