import {DynamicTexture} from "@babylonjs/core";
import {IBDynamicTextureOption} from "@/types/model/babylon/IBDynamicTextureOption";
import {BScene} from "@/models/babylon/BScene";

export class BDynamicTexture extends DynamicTexture{
    private readonly options: IBDynamicTextureOption;

    private uri: string;
    private sx: number;
    private sy: number;
    private dx: number;
    private dy: number;
    private dWidth: number;
    private dHeight: number;
    private type: string;
    private addressMode: 'CLAMP' | 'MIRROR' | 'WRAP';

    constructor(options: IBDynamicTextureOption){
        super(options.name, undefined, BScene.getInstance());

        this.options = options;

        this.name = this.options.name;
        this.uri = this.options.uri;
        this.sx = this.options.sx;
        this.sy = this.options.sy;
        this.dx = this.options.dx;
        this.dy = this.options.dy;
        this.dWidth = this.options.dWidth;
        this.dHeight = this.options.dHeight;
        this.type = this.options.type;
        this.addressMode = this.options.addressMode;
        this.hasAlpha = this.options.hasAlpha;
        this.uScale = this.options.uScale;
        this.vScale = this.options.vScale;

        this.updateSamplingMode(this.options.samplingMode);
    }

}
