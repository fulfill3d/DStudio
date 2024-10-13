import {IDesignBlueprint} from "@/interfaces/design/i-design-blueprint";

export interface ITextDesignListItem{
    design: IDesignBlueprint;
    handleRemove: (index: string) => void;
}
