import {IColorListType} from "@/types/utils/IColorListType";

export interface IColorCircleType {
    color: IColorListType;
    size: number;
    callback:  (color: IColorListType) => void
}
