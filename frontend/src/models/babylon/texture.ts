import {
    BaseTexture,
    DynamicTexture,
    Nullable,
    Scene,
    Texture as BabylonTexture,
} from "@babylonjs/core";
import type {ICanvasRenderingContext} from "@babylonjs/core/Engines/ICanvas";

interface TextureSettingsType {
    id: string;
    name: string;
    uri: string;
    size: number;
    type: string;
    hasAlpha: boolean;
    isDesignTexture: boolean;
    generateMipMaps: boolean;
    invertY: boolean;
    noMipmapOrOptions: boolean;
    uScale: number;
    vScale: number;
    addressMode: 'CLAMP' | 'MIRROR' | 'WRAP';
    samplingMode: 'LINEAR_LINEAR_MIPLINEAR' | 'BILINEAR' | 'TRILINEAR' | 'NEAREST'
}

export class Texture{

    private readonly id: string;
    private readonly name: string;
    private readonly uri: string;
    private readonly type: string;
    private readonly size: number;
    private readonly hasAlpha: boolean;
    private readonly isDesignTexture: boolean;
    private readonly generateMipMaps: boolean;
    private addressMode: number | undefined;
    private samplingMode: number | undefined;
    private readonly invertY: boolean;
    private readonly noMipmapOrOptions: boolean;
    private readonly uScale: number;
    private readonly vScale: number;
    private babylon_texture: Nullable<DynamicTexture> | Nullable<BabylonTexture>;
    private babylon_texture_context: ICanvasRenderingContext | undefined;

    constructor(settings: TextureSettingsType){
        this.id = settings.id;
        this.name = settings.name;
        this.uri = settings.uri;
        this.type = settings.type;
        this.size = settings.size;
        this.hasAlpha = settings.hasAlpha;
        this.isDesignTexture = settings.isDesignTexture;
        this.generateMipMaps = settings.generateMipMaps;
        this.invertY = settings.invertY || false;
        this.noMipmapOrOptions = settings.noMipmapOrOptions || false;
        this.uScale = settings.uScale;
        this.vScale = settings.vScale;
        this.babylon_texture = null;

        this.setupDesignMode(settings.addressMode);
        this.setupSamplingMode(settings.samplingMode);
    }

    async loadBabylonTexture(scene: Scene){
        switch (this.type){
            case 'dynamic':
                this.babylon_texture = new DynamicTexture(
                    this.name,
                    this.size,
                    scene,
                    this.generateMipMaps,
                )
                break;
            case 'standard':
            default:
                break;
        }
        await this.setupBabylonTexture();
    }

    async setupBabylonTexture(){
        if (this.babylon_texture instanceof DynamicTexture){
            this.babylon_texture_context = this.babylon_texture?.getContext();
        }
        if (this.babylon_texture){
            this.babylon_texture.hasAlpha = this.hasAlpha;
            if (this.addressMode){
                this.babylon_texture.wrapU = this.addressMode;
                this.babylon_texture.wrapV = this.addressMode;
            }
        }
        await this.drawDesignOnBabylonTexture(this.uri);
    }

    drawDesignOnBabylonTexture(src: string) {
        return new Promise<void>((resolve, reject) => {
            const image = new Image();
            image.crossOrigin = "anonymous";
            image.src = src;
            image.onload = () => {
                if (this.babylon_texture_context){
                    this.babylon_texture_context.clearRect(0, 0, this.size, this.size);
                    this.babylon_texture_context.drawImage(image, 0, 0, image.width, image.height, 0, 0, this.size, this.size);
                }
                if (this.babylon_texture && this.babylon_texture instanceof DynamicTexture){
                    this.babylon_texture.update();
                }
                resolve();
            };
            image.onerror = reject;
        });
    }

    setupDesignMode(mode: TextureSettingsType['addressMode']){
        switch (mode){
            case 'CLAMP':
                this.addressMode = BabylonTexture.CLAMP_ADDRESSMODE
                break;
            case 'MIRROR':
                this.addressMode = BabylonTexture.MIRROR_ADDRESSMODE
                break;
            case 'WRAP':
            default:
                this.addressMode = BabylonTexture.WRAP_ADDRESSMODE
                break;
        }
    }

    setupSamplingMode(mode: TextureSettingsType['samplingMode']){
        switch (mode){
            case 'LINEAR_LINEAR_MIPLINEAR':
                this.samplingMode = BabylonTexture.LINEAR_LINEAR_MIPLINEAR
                break;
            case 'BILINEAR':
                this.samplingMode = BabylonTexture.BILINEAR_SAMPLINGMODE
                break;
            case 'TRILINEAR':
                this.samplingMode = BabylonTexture.TRILINEAR_SAMPLINGMODE
                break;
            case 'NEAREST':
            default:
                this.samplingMode = BabylonTexture.NEAREST_SAMPLINGMODE
                break;
        }
    }

    updateTexture(blob: Blob, scene: Scene): Promise<Nullable<BaseTexture>> {
        return new Promise((resolve, reject) => {
            try {
                const objectURL = URL.createObjectURL(blob);
                if (this.babylon_texture){
                    this.babylon_texture = new BabylonTexture(
                        objectURL,
                        scene,
                        this.noMipmapOrOptions,
                        this.invertY,
                        this.samplingMode,
                        () => {
                            // onLoad: Called when the texture is loaded successfully.
                            if (this.babylon_texture){
                                this.babylon_texture.hasAlpha = this.hasAlpha;
                                this.babylon_texture.uScale = this.uScale;
                            }
                            resolve(this.babylon_texture); // Resolve the promise with the texture.
                        },
                        (message, exception) => {
                            // onError: Called if there is an error loading the texture.
                            reject(new Error(`Texture loading failed: ${message}`, exception)); // Reject the promise on error.
                        }
                    );
                }
            } catch (error) {
                reject(error); // Reject the promise if there is an error in the setup.
            }
        });
    }

    getBabylonTexture(): Nullable<BaseTexture>{
        return this.babylon_texture;
    }
}
