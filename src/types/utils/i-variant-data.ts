import {IAsset} from "./i-asset";

export interface IVariantData {
    id: number;
    total_colors: number;
    name: string;
    assets: IAsset[];
}
