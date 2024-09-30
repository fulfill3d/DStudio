import {IColorListType} from "@/types/utils/i-color-list-type";

export interface IColorCircleType {
    color: IColorListType;
    size: number;
    callback:  (color: IColorListType) => void
}
