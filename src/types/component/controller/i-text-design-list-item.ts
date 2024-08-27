import {IDesignBlueprint} from "@/types/design/i-design-blueprint";

export interface ITextDesignListItem{
    design: IDesignBlueprint;
    handleRemove: (index: string) => void;
}
