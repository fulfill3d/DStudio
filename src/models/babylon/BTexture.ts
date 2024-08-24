import {Texture} from "@babylonjs/core";
import {IBTextureOption} from "@/types/model/babylon/IBTextureOption";
import {BScene} from "@/models/babylon/BScene";

export class BTexture extends Texture {
    private readonly _url: string;
    constructor(options: IBTextureOption) {
        super(null, BScene.getInstance());
        this._url = options.url
    }

    loadImage(){
        this.updateURL(this._url);
    }
}
