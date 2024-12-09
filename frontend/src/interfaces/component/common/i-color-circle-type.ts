import {IColorListType} from "@/interfaces/utils/i-color-list-type";

export interface IColorCircleType {
    color: IColorListType;
    size: number;
    callback:  (color: IColorListType) => void
}
