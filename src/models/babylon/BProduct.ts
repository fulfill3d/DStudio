import {Nullable} from "@babylonjs/core";

export class BProduct {
    private static instance: Nullable<BProduct> = null;
    private static loaded: boolean = false;

    private constructor() {}

    static getInstance(): BProduct{
        if (!BProduct.instance){
            BProduct.instance = new BProduct();
        }
        return BProduct.instance;
    }

}
