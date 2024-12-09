export interface IDesignBlueprint {
    id: string;
    type: 'image' | 'text' | undefined;
    text?: string;
    name?: string;
    data?: any; // TODO: any to type
}
