import {Texture} from "@babylonjs/core";
import {IBTextureOption} from "@/interfaces/model/babylon/i-b-texture-option";
import {BScene} from "@/models/babylon/b-scene";

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
