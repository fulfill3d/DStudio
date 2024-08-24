import {IDesignBlueprint} from "@/types/design/IDesignBlueprint";

export interface IImageDesignListItem{
    design: IDesignBlueprint;
    handleRemove: (index: string) => void;
}
