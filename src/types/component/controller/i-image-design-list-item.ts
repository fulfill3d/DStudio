import {IDesignBlueprint} from "@/types/design/i-design-blueprint";

export interface IImageDesignListItem{
    design: IDesignBlueprint;
    handleRemove: (index: string) => void;
}
