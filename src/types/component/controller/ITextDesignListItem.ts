import {IDesignBlueprint} from "@/types/design/IDesignBlueprint";

export interface ITextDesignListItem{
    design: IDesignBlueprint;
    handleRemove: (index: string) => void;
}
