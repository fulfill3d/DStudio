import {IAsset} from "./IAsset";

export interface IVariantData {
    id: number;
    total_colors: number;
    name: string;
    assets: IAsset[];
}
